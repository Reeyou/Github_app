import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer'

/**
 * 日志中间件
 * @param {*} store 
 */
const logger = store => next => action => {
  if(typeof action == 'function') {
    console.log('dispatching a function')
  } else {
    console.log('dispatching', action)
  }

  const result = next(action)
  console.log('nextState', store.getState())
  return result
}

const middlewares = [
  thunk,
  logger
]
/**
 * 创建store
 */
export default createStore(reducer,applyMiddleware(...middlewares))