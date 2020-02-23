import { AsyncStorage } from 'react-native'
import GitHubTrending from 'GitHubTrending'
export const FLAG = {
  flag_popular: 'popular',
  flag_trending: 'trending'
}
export default class DataStore {
  /**
   * 数据请求入口
   * @param {*} url 
   */
  fetchData(url, flag) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then((wrapperData) => {
        if (wrapperData && DataStore.checkTimestampValid(wrapperData.timestamp)) {
          resolve(wrapperData)
        } else {
          this.fetchNetData(url, flag).then(data => {
            resolve(this._wrapperData(data))
          }).catch(err => {
            reject(err)
          })
        }
      }).catch(err => {
        this.fetchNetData(url, flag).then(data => {
          resolve(this._wrapperData(data))
        }).catch(err => {
          reject(err)
        })
      })
    })
  }
  /**
   * 加载本地数据
   * @param {*} url 
   */
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      // console.log(AsyncStorage.getItem(url))
      AsyncStorage.getItem(url, (err, result) => {
        if (!err) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e)
            console.error(e)
          }
        } else {
          reject(err)
          console.error(err)
        }
      })
    })
  }
  /**
   * 获取网络数据
   * @param {*} url 
   */
  fetchNetData(url, flag) {
    return new Promise((resolve, reject) => {
      if (flag !== FLAG.flag_trending) {
        fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('Network response was not ok')
        })
        .then(res => {
          this.saveData(url, res)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      } else {
        new GitHubTrending().fetchTrending(url)
        .then(items => {
          if(!items) {
            throw new Error('responseData is null')
          }
          this.saveData(url, items)
          resolve(items)
        })
        .catch(err => {
          reject(err)
        })
      }
    })
  }
  /**
 * 保存数据
 * @param {*} url 
 * @param {*} data 
 * @param {*} callback 
 */
  saveData(url, data, callback) {
    if (!data || !url) return
    AsyncStorage.setItem(url, JSON.stringify(this._wrapperData(data)), callback)

  }
  /**
   * 合并时间戳
   * @param {*} data 
   */
  _wrapperData(data) {
    return {
      data,
      timestamp: new Date().getTime()
    }
  }
  /**
   * 时间戳有效期校验
   * @param {*} timestamp 
   */
  static checkTimestampValid(timestamp) {
    const currentTime = new Date()
    const targetTime = new Date()
    targetTime.setTime(timestamp)
    if (currentTime.getMonth() !== targetTime.getMonth()) return false;
    if (currentTime.getDate() !== targetTime.getDate()) return false;
    if (currentTime.getHours() - targetTime.getHours() > 4) return false;
    return ture

  }
}
