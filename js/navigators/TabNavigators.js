import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import PopularPage from '../pages/PopularPage'
import TrendingPage from '../pages/TrendingPage'
import FavoritePage from '../pages/FavoritePage'
import UserPage from '../pages/UserPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class TabNavigators extends Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true; // 关闭黄色警告框
  }

  _tabNavigator() {
    const { PopularPage, TrendingPage, FavoritePage, UserPage } = TABS

    // 动态修改TABS属性
    PopularPage.navigationOptions.tabBarLabel = '最热1'
    return createAppContainer(
      createBottomTabNavigator(TABS)
    )
  }

  render() {
    const TAB = this._tabNavigator()
    return <TAB />
  }
}

const TABS =
{
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={'md-trending-up'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  UserPage: {
    screen: UserPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo
          name={'user'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
}