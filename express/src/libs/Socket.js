import sockets from "@sockets/sockets"
import amqps from "@amqps/amqps"
import events from "@store/events"

const socketIO = require('socket.io')

export default class Socket {
    constructor(server) {
        if (process.env.NODE_ENV === 'production') {
            this._io = socketIO(server)
            // Set Allow-origin check.
            // this._io.origins([process.env.CLIENT_APP])
        } else {
            // HandlePreflightRequest has to be added to be in line with production mode.
            this._io = socketIO(server, {
                handlePreflightRequest: function (req, res) {
                    const headers = {
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        'Access-Control-Allow-Origin': req.headers.origin,
                        'Access-Control-Allow-Credentials': true
                    };
                    res.writeHead(200, headers);
                    res.end();
                }
            })
        }
    }

    invokeSockets(amqpIns) {

        amqps.forEach(callback => {
            callback(amqpIns, events)
        })

        sockets.forEach(o => {
            let io = null
            if (o.namespace === '') {
                io = this._io
            } else if (o.namespace) {
                io = this._io.of(o.namespace)
            }

            if (o.broadcasts && Array.isArray(o.broadcasts) && o.broadcasts.length > 0) {
                o.broadcasts.forEach(callback => {
                    callback(io, events)
                })
            }

            io.on('connection', socket => {
                console.log((o.namespace ? o.namespace : 'default') + ' socket connected')
                socket['subscriptions'] = {}

                o.sockets.forEach(callback => {
                    callback(socket, events)
                })

                socket.on('disconnect', () => {
                    if (socket.subscriptions && Object.keys(socket.subscriptions).length > 0) {
                        Object.keys(socket.subscriptions).forEach(i => {
                            if (Array.isArray(socket.subscriptions[i]) && socket.subscriptions[i].length > 0) {
                                socket.subscriptions[i].forEach(s => {
                                    if (typeof s.unsubscribe === 'function') {
                                        s.unsubscribe()
                                    }
                                })
                            }
                        })
                    }
                    console.log('user disconnected')
                })

            })
            io.on('error', function (error) {
                console.error('socket error: ' + error)
            }).on('connect_error', function (error) {
                console.error('socket connect error: ' + error)
            });
        })
    }
}
