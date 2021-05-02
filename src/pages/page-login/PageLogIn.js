import React, { useState } from 'react'
import './PageLogin.css'

const PageLogin = ({submitForm}) => {

  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')
  

  // Validation form function (it has return TRUE or FALSE)
  const validate = () => {
    let userError = ''

    if (!userName) userError = 'Необходимо ввести имя'
    if (userName && userName.length < 3) userError = 'Имя должно быть не менее 3 символов'
    if (userName && userName.length >= 3) userError = ''

    if (userError) {
      setUserNameError(userError)
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

    if (isValid) {
      submitForm(userName)
      setUserName('')
      setUserNameError('')
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

      <button type='submit'>JOIN CHAT</button>
    </form>
  )
}

export default PageLogin