import {io} from 'socket.io-client'

const socket = io('http://localhost:9999', {
  withCredentials: true
})

socket.connect('http://localhost:9999', {reconnect: true})

export default socket