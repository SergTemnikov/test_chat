 const reducer = (state, action) => {
  switch (action.type) {
    case 'ENTERED': return {
      ...state, 
      entered: true,
      userName: action.payload.userName,
      roomName:action.payload.roomName
    }
    default: 
      return state
  }
}

export default reducer