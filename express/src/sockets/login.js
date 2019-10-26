const login = (socket, amqp) => {
    console.log('login socket')
    // socket.emit('FromAPI', { hello: 'world' })
    
    // socket.on('login success', function(id, msg){
    //     // socket.broadcast.to(id).emit('my message', msg);
    //     socket.emit('FromAPI', { hello: 'again' })
    // });
    
    // amqp.invokeQueue({
    //     queue: 'AIR_REALTIMEDATA_QUEUE'
    // }, msg => {
    //     socket.emit('FromAPI', msg.content.toString())
    // })
}

export default login
