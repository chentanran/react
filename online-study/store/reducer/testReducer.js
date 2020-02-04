export default function testReducer(state={color: 'blue'}, action) {
  switch(action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        color: action.color
      }
    default:
      return state
  }
}