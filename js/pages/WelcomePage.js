import React,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import NavigationUtil from '../navigators/NavigationUtil'
import SplashScreen from 'react-native-splash-screen'

export default class WelcomePage extends Component {
  
  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      NavigationUtil.resetToHomePage(this.props)
    },2000)
  }
  UNSAFE_componentWillMount() {
    // 页面销毁时，清空定时器
    this.timer&&clearTimeout(this.timer)
  }
  render() {
    // 添加广告
    return null
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})