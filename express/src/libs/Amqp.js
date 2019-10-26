import { AMQP_URL } from '@utils/urlUtil'
const all = require('bluebird').all
const amqp = require('amqplib')

export default class Amqp {
    constructor() {
        console.log(AMQP_URL)
        this._connection = amqp.connect(AMQP_URL);
        this._channel = this._connection.then(function (c) {
            console.log('MQ server connected');
            return c.createChannel();
        }).then(ch => {
            ['error','close'].forEach(function(ev) {
                ch.on(ev, (err) => {
                    console.error(err)
                })
            });
            return ch
        }).catch(err => {
            console.error(err)
        })
    }

    invokeQueue = (options, callback) => {
        this._channel.then(function (ch) {
            let ok = null
            if (options.exchange && typeof options.exchange === 'object') {
                let queue = null
                ok = ch.assertExchange(options.exchange.name, options.exchange.type || 'topic', {durable: typeof options.exchange.durable === 'undefined' ? true : options.exchange.durable}).then(() => {
                   return ch.assertQueue('', {exclusive: true})
                })
                ok = ok.then((qok) => {
                    queue = qok.queue
                    return all(options.exchange.routings.map((rk) => {
                        ch.bindQueue(queue, options.exchange.name, rk)
                    })).then(() => { 
                        return queue
                    }).catch(err => console.log(err))
                })
            } else {
                ok = ch.assertQueue(options.queue, {durable: typeof options.durable === 'undefined' ? true : options.durable}).then((qok) => {
                    return qok.queue
                }).catch(err => console.log(err))
            }

            ok.then((queue) => {
                
                ch.consume(queue, (msg) => {
                    if (typeof callback === 'function') {
                        try {
                            callback(msg)
                        } catch(err) {
                            console.error(err);
                        }
                    }
                }, {noAck:true}).catch(err => {
                        console.error(err)
                    });
            }).catch(err => {
                console.error(err)
            });
        });
    }
}
