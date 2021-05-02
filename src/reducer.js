 const reducer = (state, action) => {
  switch (action.type) {
    case 'ENTERED': return {
      ...state, 
      entered: true,
      userName: action.userName
    }
    default: 
      return state
  }
}

export default reducer