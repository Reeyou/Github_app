import { AsyncStorage } from 'react-native'

const FAVORITE_KEY = 'favorite_'
export default class FavoriteDao {
  constructor(flag) {
    this.favoriteKey = FAVORITE_KEY + flag
  }

  /**
   * 收藏项目
   * @param {*} key 
   * @param {*} value 
   * @param {*} callBack 
   */
  saveFavoriteItem(key, value, callBack) {
    AsyncStorage.setItem(key, value, (err, result) => {
      if (!err) {
        this.updateFavoriteKeys(key, true)
      }
    })
  }

  /**
   * 取消收藏
   * @param {*} key 
   */
  removeFavoriteItem(key) {
    AsyncStorage.removeItem(key, (err, resulte) => {
      if (!err) {
        this.updateFavoriteKeys(key, false)
      }
    })
  }

  /**
   * 更新收藏
   * @param {*} key 
   * @param {*} isAdd ture 添加 / false 删除
   */
  updateFavoriteKeys(key, isAdd) {
    AsyncStorage.getItem(this.favoriteKey, (err, result) => {
      if (!err) {
        let favoriteKeys = [];
        if (result) {
          favoriteKeys = JSON.parse(result);
        }
        let index = favoriteKeys.indexOf(key)
        // 添加 / 删除
        if (isAdd) {
          // 不存在则添加
          if (index === -1) favoriteKeys.push(key)
        } else {
          if (index !== -1) favoriteKeys.splice(key, 1)
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
      }
    })
  }

  /**
   * 获取收藏对应的key
   */
  getFavoriteKey() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (err, result) => {
        if (!err) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e)
          }
        } else {
          reject(err)
        }
      })
    })
  }

  /**
   * 获取所有收藏项目
   */
  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKey()
        .then(keys => {
          let items = []
          if (keys) {
            AsyncStorage.multiGet(keys, (err, stores) => {
              try {
                stores.map((result, i, store) => {
                  let key = store[i][0]
                  let value = store[i][1]
                  if (value) items.push(JSON.parse(value))
                })
                resolve(items)
              } catch (e) {
                reject(e)
              }
            })
          } else {
            resolve(items)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}