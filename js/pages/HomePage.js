import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import TabNavigator from '../navigators/TabNavigators'

export default class HomePage extends Component {

  render() {
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