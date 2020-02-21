import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import TabNavigator from '../navigators/TabNavigators'
import NavigationUtil from '../navigators/NavigationUtil'

export default class HomePage extends Component {

  render() {
    // FIX TabNavigator导航页无法跳转到外部导航页问题
    NavigationUtil.navigation = this.props.navigation
    return (
      <TabNavigator />
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})