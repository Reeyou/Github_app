import TYPES from '../TYPES'
import DataStore,{FLAG} from '../../api/DataStore'
import {handleData} from '../actionUtil'

/**
 * 获取最热数据的异步action
 * @param {*} storeName 
 * @param {*} url 
 */
export function onRefreshTrending(storeName, url, pageSize) {
  return dispatch => {
    dispatch({
      type: TYPES.TRENDING_REFRESH,
      storeName
    })
    let dataStore = new DataStore()
    dataStore.fetchData(url,FLAG.flag_trending)
      .then(data => {
        handleData(TYPES.TRENDING_REFRESH_SUCCESS,dispatch, storeName, data, pageSize)
        console.log(data)
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: TYPES.TRENDING_REFRESH_FAIL,
          storeName,
          err
        })
      })
  }
}
/**
 * 
 * @param {*} storeName 
 * @param {*} pageIndex 第几页
 * @param {*} pageSize 
 * @param {*} dataArray 
 * @param {*} callback 
 */
export function onLoadTrendingMoreData(storeName, pageIndex, pageSize, dataArray = [], callback) {
  return dispatch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof callback == 'function') {
          callback('no more')
        }
        dispatch({
          type: TYPES.TRENDING_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray
        })
      } else {
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        dispatch({
          type: TYPES.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max)
        })
      }
    }, 1000)
  }
}