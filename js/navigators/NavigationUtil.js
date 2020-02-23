
export default class NavigationUtil {
  /**
   * 重置到首页
   * @param {*} params 
   */
  static resetToHomePage(params) {
    const { navigation } = params
    navigation.navigate('Main')
  }

  /**
   * 跳转到指定页面
   * @param {*} page 页面名
   * @param {*} params 参数
   */
  static goPage(page,params = {}) {
    const navigation = NavigationUtil.navigation
    if(!navigation) {
      console.log('navigation can not be null')
      return
    }
    navigation.navigate(page,{...params})
  }

  /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation) {
      navigation.goBack();
  }
}