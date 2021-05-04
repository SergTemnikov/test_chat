import React, { useState } from 'react'
import PreLoader from '../../components/common/preloader/PreLoader'
import './PageLogin.css'
import {Grid, Paper, Avatar, TextField, Button, InputLabel, MenuItem, Select} from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen';

const PageLogin = ({submitForm, isEntered, isLoading}) => {

  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [isRoomError, setIsRoomError] = useState(false)
  const [isUserError, setIsUserError] = useState(false)

  const paperStyle = {padding: 20, height: 400, width: 300, margin: '50px auto'}

  // Validation form function (it has return TRUE or FALSE)
  const validate = () => {
    let userError = ''

    if (!userName) userError = 'You should enter your name'
    if (userName && userName.length < 3) userError = 'Name must be at least 3 characters'
    if (userName && userName.length >= 3) userError = ''

    if (userError) {
      setIsRoomError(true)
      setIsUserError(true)
      setUserNameError(userError)
      return false
    }
    return true
  }

  // User name value controller
  const userNameHandler = (e) => {
    setUserName(e.target.value)
    if (e.target.value.length < 3) {
      setIsUserError(true)
      setUserNameError('Name must be at least 3 characters')
    } else if (e.target.value.length >= 3) {
      setIsUserError(false)
      setUserNameError('')
    }
  }

  const roomNameHandler = (e) => {
    setRoomName(e.target.value)
    if (!e.target.value) {
      setIsRoomError(true)
    } else {
      setIsRoomError(false)
    }
  }

  // Submit form function
  const onSubmitLogin = event => {
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
    }
  }

  return (
    <>
      {isLoading && <div className='preloaderWrapper'><PreLoader /></div> }
      { (!isEntered && !isLoading)
        && <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={{backgroundColor: '#673ab7'}}><LockOpenIcon/></Avatar>
            <h3>Login</h3>
          </Grid>
          
            <TextField
              id="outlined-secondary"
              name='userName'
              type='text'
              label="Your name"
              placeholder='Enter your name'
              variant="outlined"
              color="primary"
              fullWidth
              value={userName}
              required
              error={isUserError}
              helperText={userNameError}
              onChange={e => userNameHandler(e)}
            />
  
            <InputLabel id="room" style={{margin: '15px 0 15px'}}>Choose chat room</InputLabel>
            <Select
              id='room'
              name='roomName'
              value={roomName}
              fullWidth
              required
              variant="outlined"
              error={isRoomError}
              onChange={e => roomNameHandler(e)}>
  
              <MenuItem value='black'>Black</MenuItem>
              <MenuItem value='green'>Green</MenuItem>
              <MenuItem value='red'>Red</MenuItem>
            </Select>
  
            <Button 
              type='submit' 
              variant="contained" 
              onClick={() => onSubmitLogin()}
              fullWidth
              style={{backgroundColor: '#673ab7', color: '#fff', marginTop: '15px'}}>JOIN CHAT
            </Button>
          
        </Paper>
      </Grid>}
    </>
    
  )
}

export default PageLogin