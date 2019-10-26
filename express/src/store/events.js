const postal = require('postal')

const channel = postal.channel()

function emit(key, val) {
    channel.publish( key, val );
}

function off(subscription) {
    if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe()
    }
}

function on(key, callback) {
    const subscription = channel.subscribe( key, ( data ) => {
        callback(data)
    })
    return subscription
}

function once(key, callback) {
    const subscription = on(key, callback)
    off(subscription)
}

export default {
    emit,
    off,
    on,
    once
}
