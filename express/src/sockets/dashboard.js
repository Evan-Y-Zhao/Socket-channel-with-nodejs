import { FROMAPI } from '@utils/eventsUtil'
import storage from '@store/storage'

const dashboard = (socket, events) => {
    const subscriptions = []
    // const subscription1 = events.on(FROMAPI, data => {
    //     // console.log(data)
    //     socket.emit(FROMAPI, data)
    // })
    
    socket.emit(FROMAPI, storage.read(FROMAPI))
    // subscriptions.push(subscription1)
    socket['subscriptions']["dashboard"] = subscriptions

    socket.on('dashboard', function (id, msg) {
        // const subscriptiondash = events.on(FROMAPI, data => {
        //     // console.log(data)
        //     socket.emit(FROMAPI, data)
        // })
        // subscriptions.push(subscriptiondash)
        // socket['subscriptions']["dashboard"] = subscriptions
        // socket.broadcast.to(id).emit('my message', msg);
        // setInterval(() => {
        //     socket.emit('FromAPINamespace', { hello: 'again namespace' })
        // }, 1000)
    });

    // setInterval(() => {
    //     socket.emit('FromAPINamespace', { hello: 'again namespace' })
    // }, 1000)
    // amqp.invokeQueue({
    //     queue: AIR_REALTIMEDATA_QUEUE
    // }, msg => {
        
    //     socket.emit('FromAPINamespace', msg.content.toString())
    // })
}

export default dashboard
