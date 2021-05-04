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

const PORT = process.env.PORT || 9999

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const rooms = new Map([
  ['black', new Map([
    ['users', new Map()] ,
    ['messages', [{userName: 'Sergey', text: 'Hello, buddy'}]]
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
  

app.get('/rooms/:id', (req, res) => {
  const {id: roomName} = req.params
  const obj = rooms.has(roomName) ? {
    users: [...rooms.get(roomName).get('users').values()],
    messages: [...rooms.get(roomName).get('messages').values()]
  } : { users: [], messages: [] }
  res.json(obj)
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
    socket.to(roomName).emit('ROOM_SET_USERS', users)
  })
  
  socket.on('ROOM_NEW_MESSAGE', ({userName, roomName, text}) => {
    const obj = {
      userName,
      text
    }
    rooms.get(roomName).get('messages').push(obj)
    socket.to(roomName).emit('ROOM_NEW_MESSAGE', obj)
  })
  
  socket.on('disconnect', () => {
    rooms.forEach((value, roomName) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()]
        socket.broadcast.to(roomName).emit('ROOM_SET_USERS', users)
      }
    })
  })
})

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log('Server is started!')
})