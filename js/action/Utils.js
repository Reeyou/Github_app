export default class Utils {

  /**
   * 检查item是否收藏
   * @param {*} item 
   * @param {*} keys 
   */
  static checkFavorite(item, keys = []) {
    if(!key) return false
    for(let i = 0, len = keys.length; i < len; i++) {
      let id = item.id ? item.id : item.fullName
      if(id.toString() === keys[i]) {
        return true
      }
    }
    return false
  }
}