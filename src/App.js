import React, {useReducer, useState} from 'react'
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
    userName: null
  })

  const onLogin = (userName) => {
    dispatch({type: 'ENTERED', userName})

    setIsLoading(false)

    socket.emit('ROOM:ENTERED', {userName})
  }

  const submitForm = async (userName) => {
    setIsLoading(true)
    await axios.post('/rooms', {userName})
      .then(() => {
        onLogin(userName)
      })
  }

  window.socket = socket

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
