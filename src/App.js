import React, {useReducer, useState, useEffect} from 'react'
import * as axios from 'axios'
import PageLogin from './pages/page-login'
import reducer from './reducer'
import PreLoader from './components/common/preloader/PreLoader'
// eslint-disable-next-line
import socket from './service/socket'
import './index.css'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    entered: false,
    userName: null,
    roomName: null
  })

  const onLogin = (obj) => {
    dispatch({
      type: 'ENTERED', 
      payload: obj
    })
    setIsLoading(false)
    socket.emit('ROOM_JOIN', obj)
  }

  useEffect(() => {
    socket.on('ROOM_JOINED', users => {
      console.log('Новый пользователь: ', users);
    })
  }, [])

  

  const submitForm = async (obj) => {
    setIsLoading(true)
    await axios.post('/rooms', obj).then(() => {
      onLogin(obj)
    })
  }

  return (
    <div>
      {
        isLoading
        ? <div className='preloaderWrapper'>
            <PreLoader />
          </div> 
        : <div className='login'>
            {!state.entered && <PageLogin submitForm={submitForm}/>}
          </div>
      }
    </div>
  );
}

export default App;
