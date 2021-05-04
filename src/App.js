import React, {useReducer, useState, useEffect} from 'react'
import * as axios from 'axios'
import PageLogin from './pages/page-login'
import PageChats from './pages/page-chats'
import reducer from './reducer'
// eslint-disable-next-line
import socket from './service/socket'
import './index.css'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    entered: false,
    userName: null,
    roomName: null,
    users: [],
    messages: []
  })

  const onLogin = async (obj) => {
    dispatch({
      type: 'ENTERED', 
      payload: obj
    })
    setIsLoading(false)
    socket.emit('ROOM_JOIN', obj)
    const {data} = await axios.get(`/rooms/${obj.roomName}`)
    setUsers(data.users)
  }

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    })
  }

  useEffect(() => {
    socket.on('ROOM_SET_USERS', setUsers)
    socket.on('ROOM_NEW_MESSAGE', addMessage)
  }, [])

  const submitForm = async (obj) => {
    setIsLoading(true)
    await axios.post('/rooms', obj).then(() => {
      onLogin(obj)
    })
  }

  return (
    <div className='app'>
      {!state.entered 
        ? <div className='login'>
            <PageLogin isLoading={isLoading} isEntered={state.entered} submitForm={submitForm}/>
          </div> 
        : <PageChats {...state} onAddMessage={addMessage}/>
      }
    </div>
  )
}

export default App
