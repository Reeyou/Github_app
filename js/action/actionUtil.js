
import ProjectModal from "../modal/projectModal";
import Utils from "./Utils";

/**
 * 
 * @param {*} dispatch 
 * @param {*} storeName 
 * @param {*} data 
 * @param {*} pageSize 
 */
export function handleData(type, dispatch, storeName, data, pageSize, favoriteDao, params) {
  let fixItems = []
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items
    }

  }
  let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize)
  _projectModals(showItems, favoriteDao, projectModels => {
    dispatch({
      type: type,
      items: fixItems,
      projectModels: projectModels, // 第一次要加载的数据
      storeName,
      pageIndex: 1,
      ...params
    })
  })

}

export async function _projectModals(showItems, favoriteDao, callback) {
  let keys = []
  try {
    keys = await favoriteDao.getFavoriteKey()
  } catch (error) {
    console.log(error)
  }
  let projectModels = []
  for (let i = 0, len = showItems.length; i < len; i++) {
    projectModels.push(new ProjectModal(showItems[i], Utils.checkFavorite(showItems[i], keys)))
  }
  if (typeof callback === 'function') {
    callback(projectModels)
  }
}