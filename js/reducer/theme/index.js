import Types from '../../action/types'

const defaultState = {
  theme: 'red'
} 

export default function onAction(state = defaultState, action) {
  switch(action.types) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme
      };
      default:
        return state
  }
}