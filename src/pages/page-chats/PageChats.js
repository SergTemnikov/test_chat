import React, { useState } from 'react'
import socket from '../../service/socket'
import './PageChats.css'
import {Button, Grid, Paper, TextField, List, ListItem, ListItemText} from '@material-ui/core'

const PageChats = ({users, messages, userName, roomName, onAddMessage}) => {

  const [messageText, setMessageText] = useState('')

  let today = new Date();
  let date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes();
  let dateTime = date+' '+time;

  const onSendMessage = () => {
    socket.emit('ROOM_NEW_MESSAGE', {
      userName,
      roomName,
      text: messageText
    })
    setMessageText('')
    onAddMessage({userName, text: messageText})
  }

  const onlineUsers = () => {
    return !users.length ? '0' : users.length
  }

  const paperStyle = {width: 900, margin: '50px auto', height: '70vh'}

  const chatStyle = {
    display: 'flex',
    padding: 15,
  }

  const messagesArea = {
    width: 635,
    height: '59vh',
    textAlign: 'left',
    padding: 15
  }

  const messagesWrapper = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 422, 
    overflow: 'auto', 
    padding: 10, 
    marginBottom: 15
  }

  const msgStyle = {
    maxWidth: 300,
    backgroundColor: '#673ab7',
    padding: 15,
    color: 'white',
    borderRadius: '10px',
    marginBottom: 10
  }

  return (

    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center' style={{paddingTop: 25}}>
          <h3 style={{color: '#482880'}}>Chat room: <span style={{color: `${roomName}`}}>{roomName}</span></h3>
          <Grid style={chatStyle} >
            <Grid style={{marginRight: 15, height: '100%'}}>
              <Paper elevation={9} style={{width: 220, padding: 10, height: '59vh'}}>
              <div>
                <b style={{color: 'green'}}>Online ({onlineUsers()})</b>
                <List dense>
                  {
                    users.map((user, i) => {
                        return <ListItem>
                          <ListItemText
                            key={i}
                            primary={user}
                          />
                        </ListItem>
                    })
                  }
                </List>
              </div>
              </Paper>
            </Grid>
            <Grid>
              <Paper elevation={10} style={messagesArea}>
                <Grid style={messagesWrapper}>
                  { messages.map(msg => {
                      return (
                        <div style={msgStyle}>
                            {msg.text}
                            <p style={{fontSize: 12, paddingTop: 10, margin: 0, textAlign: 'right'}}>{msg.userName}, {dateTime}</p>
                        </div>
                      )
                    })
                  }
                </Grid>
                  <TextField 
                    rows='4' 
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    fullWidth
                    multiline
                    variant="outlined"
                    placeholder='Your message...'/>

                  <div>
                    <Button style={{backgroundColor: '#673ab7', color: '#fff', marginTop: '15px'}} onClick={onSendMessage}>SEND</Button>
                  </div>
              </Paper>
            </Grid>
          </Grid>
        
        </Grid>
      </Paper>
    </Grid>
  )
}

export default PageChats