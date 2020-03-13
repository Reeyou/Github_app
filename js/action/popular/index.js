import TYPES from '../TYPES'
import DataStore,{FLAG_STORAGE} from '../../api/DataStore'
import {handleData, _projectModals} from '../actionUtil'

/**
 * 获取最热数据的异步action
 * @param {*} storeName 
 * @param {*} url 
 */
export function onLoadPopularData(storeName, url, pageSize, favoriteDao) {
  return dispatch => {
    dispatch({
      type: TYPES.POPULAR_REFRESH,
      storeName
    })
    let dataStore = new DataStore()
    dataStore.fetchData(url,FLAG_STORAGE.flag_popular)
      .then(data => {
        handleData(TYPES.POPULAR_REFRESH_SUCCESS,dispatch, storeName, data, pageSize,favoriteDao)
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: TYPES.POPULAR_REFRESH_FAIL,
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
export function onLoadPopularMoreData(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callback) {
  return dispatch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof callback == 'function') {
          callback('no more')
        }
        dispatch({
          type: TYPES.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: --pageIndex
        })
      } else {
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        _projectModals(dataArray.slice(0,max),favoriteDao,data=> {
          dispatch({
            type: TYPES.POPULAR_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModes: data
          })
        })
        
      }
    }, 1000)
  }
}