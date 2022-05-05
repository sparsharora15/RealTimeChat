const io = require('socket.io')(8080, {cors: {origin: "*"}})
const users = {};
io.on('connection',socket=>{
    socket.on('new-user-joined', name=>{
        // console.log('name',name)
        users[socket.id] = name;
        // console.log('socket',socket.id)
        socket.broadcast.emit('user-joined',name)
    })  
    socket.on('send',message=>{
        socket.broadcast.emit('receive', {message: message , name: users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]); 
        delete users[socket.id];
    })
}) 