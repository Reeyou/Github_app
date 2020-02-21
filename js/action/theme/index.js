import TYPES from '../TYPES'
export function onThemeChange(theme) {
  return {
    type: TYPES.THEME_CHANGE,
    theme
  }
}