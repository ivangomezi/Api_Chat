'use strict'

const app = require('express')()
const serverHTTP = require('http').Server(app)
const io = require('socket.io')(serverHTTP, {
    transports: ['polling', 'websocket'],
    cors: {
        //origin: 'https://www.marwee.com.co',
        origin: 'http://wigilabs.marwee.com.co',
        //origin: 'http://localhost:4200',
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})


const myMessages = []

io.on('connection', function(socket) {
    socket.on('send-message', function(data){
        myMessages.push(data)
        socket.emit('text-event', myMessages)
        socket.broadcast.emit('text-event', myMessages)
    })
    console.log(socket.myMessages + 'a user connected');
})



serverHTTP.listen(3000, () => {
    console.log("server running on port 3000")
})

app.get('/', function(req, res, next){
    res.json({msg: "Servidor cors enable"})
})

