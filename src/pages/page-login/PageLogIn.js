import React, { useState } from 'react'
import './PageLogin.css'

const PageLogin = ({submitForm}) => {

  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [roomNameError, setRoomNameError] = useState('')
  

  // Validation form function (it has return TRUE or FALSE)
  const validate = () => {
    let userError = ''
    let roomError = ''

    if (!userName) userError = 'Необходимо ввести имя'
    if (!roomName) roomError = 'Необходимо выбрать комнату'
    if (userName && userName.length < 3) userError = 'Имя должно быть не менее 3 символов'
    if (userName && userName.length >= 3) userError = ''

    if (userError || roomError) {
      setUserNameError(userError)
      setRoomNameError(roomError)
      return false
    }
    return true
  }

  // User name value controller
  const userNameHandler = (e) => {
    setUserName(e.target.value)
    if (e.target.value.length < 3) {
      setUserNameError('Имя должно быть не менее 3 символов')
    } else if (e.target.value.length >= 3) {
      setUserNameError('')
    }
  }

  // Submit form function
  const onSubmitLogin = event => {
    event.preventDefault()
    const isValid = validate()

    const authData = {
      userName,
      roomName
    }

    if (isValid) {
      submitForm(authData)
      setUserName('')
      setRoomName('')
      setUserNameError('')
      setRoomNameError('')
    }
  }

  return (
    <form onSubmit={onSubmitLogin}>
      <input
        name='userName'
        type='text'
        placeholder='Your name'
        value={userName}
        onChange={e => userNameHandler(e)} />

      <div style={{ color: 'Maroon', margin: '-10px 0 15px', width: '100%' }}>
        {userNameError}
      </div>

      <select
        name='roomName'
        defaultValue='#'
        onChange={e => setRoomName(e.target.value)}>
          <option value='#' disabled>Выберите комнату</option>
          <option value='black'>Black room</option>
          <option value='green'>Green room</option>
          <option value='red'>Red room</option>
        </select>

      <div style={{ color: 'Maroon', margin: '-10px 0 15px', width: '100%' }}>
        {roomNameError}
      </div>

      <button type='submit'>JOIN CHAT</button>
    </form>
  )
}

export default PageLogin