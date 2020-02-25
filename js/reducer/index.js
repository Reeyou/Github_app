import {combineReducers} from 'redux'
import theme from './theme'
import popular from './popular'
import trending from './trending'
import language from './language'

/**
 * 合并reducer
 */
const index = combineReducers({
  theme,
  popular,
  trending,
  language
})
export default index