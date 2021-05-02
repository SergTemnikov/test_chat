const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
})

app.use(express.json())

const chats = new Map([
  ['Room#1', new Map([
    ['users', new Map()],
    ['messages', []]
  ])]
])

app.get('/rooms', (req, res) => {
  res.json(chats)
})

app.post('/rooms', (req, res) => {
  const { userName } = req.body
  

  res.send()
})

io.on('connection', socket => {
  socket.on('ROOM:ENTERED', ({userName}) => {
    socket.join('Room#1')  
    chats.get('Room#1').get('users').set(socket.id, userName)
    const users = chats.get('Room#1').get('users').values()
    socket.to('Room#1').broadcast.emit()
    console.log(users);
  })
  
})

server.listen(9999, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log('Server is started!')
})