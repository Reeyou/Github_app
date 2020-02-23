/**
 * 
 * @param {*} dispatch 
 * @param {*} storeName 
 * @param {*} data 
 * @param {*} pageSize 
 */
export function handleData(type, dispatch, storeName, data, pageSize) {
  let fixItems = []
  if(data&&data.data&&data.data) {
    if(Array.isArray(data.data)) {
      fixItems = data.data
    } else if(Array.isArray(data.data.items)) {
      fixItems = data.data.items
    }
    
  }
  dispatch({
    type: type,
    items: fixItems,
    projectModes: pageSize > fixItems.length?fixItems:fixItems.slice(0,pageSize), // 第一次要加载的数据
    storeName,
    pageIndex: 1
  })
}