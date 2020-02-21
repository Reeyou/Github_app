import types from '../types'
export default function onThemeChange(theme) {
  return {
    type: types.THEME_CHANGE,
    theme
  }
}