const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
})

app.use(express.json())

const rooms = new Map([
  ['black', new Map([
    ['users', new Map()] ,
    ['messages', []]
  ])],
  ['green', new Map([
    ['users', new Map()] ,
    ['messages', []]
  ])],
  ['red', new Map([
    ['users', new Map()] ,
    ['messages', []]
  ])]
])
  

app.get('/rooms', (req, res) => {
  res.json(rooms)
})

app.post('/rooms', (req, res) => {
  const {userName, roomName} = req.body
  res.send()
})

io.on('connection', (socket) => {
  socket.on('ROOM_JOIN', ({userName, roomName}) => {
    
    socket.join(roomName)
    rooms.get(roomName).get('users').set(socket.id, userName)
    
    const users = [...rooms.get(roomName).get('users').values()]
    socket.broadcast.to(roomName).emit('ROOM_JOINED', users)
  })
  
  // console.log(rooms)
})

server.listen(9999, (err) => {
  if (err) {
    throw Error(err)
    console.error(err);
  }
  console.log('Server is started!')
})