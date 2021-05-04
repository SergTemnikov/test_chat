 const reducer = (state, action) => {
  switch (action.type) {
    case 'ENTERED': return {
      ...state, 
      entered: true,
      userName: action.payload.userName,
      roomName:action.payload.roomName
    }
    case 'SET_USERS': return {
      ...state,
      users: action.payload
    }
    case 'NEW_MESSAGE': return {
      ...state,
      messages: [...state.messages, action.payload]
    }
    default: 
      return state
  }
}

export default reducer