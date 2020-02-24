
import ProjectModal from "../modal/projectModal";
import Utils from "./Utils";

/**
 * 
 * @param {*} dispatch 
 * @param {*} storeName 
 * @param {*} data 
 * @param {*} pageSize 
 */
export function handleData(type, dispatch, storeName, data, pageSize,favoriteDao) {
  let fixItems = []
  if(data&&data.data&&data.data) {
    if(Array.isArray(data.data)) {
      fixItems = data.data
    } else if(Array.isArray(data.data.items)) {
      fixItems = data.data.items
    }
    
  }
  let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0,pageSize)
  _projectModals(showItems,favoriteDao,projectModals => {
    dispatch({
      type: type,
      items: fixItems,
      projectModes: projectModals, // 第一次要加载的数据
      storeName,
      pageIndex: 1
    })
  })
  
}

export async function _projectModals(showItem, favoriteDao,callback) {
  let keys = []
 try {
  keys = await favoriteDao.getFavoriteKeys()
 } catch (error) {
  console.log(error)
 }
  let projectModals = []
  for(let i = 0, len = showItem.length; i < len; i++) {
    projectModals.push(new ProjectModal(showItem(i),Utils.checkFavorite(showItem(i),keys)))
  }
  if(typeof callback === 'function') {
    callback(projectModals)
  }
}