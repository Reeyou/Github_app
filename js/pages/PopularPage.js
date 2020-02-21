import React,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import NavigationUtil from '../navigators/NavigationUtil';

export default class PopularPage extends Component {
  constructor(props) {
    super(props)
    this.navList = ['Java','Javascript','nodejs','React','Vue','ReactNative',]
  }
  _getNavs() {
    const navs = {}
    this.navList.forEach((item,index) => {
      navs[`nav${index}`] = {
        screen: props => <PopularTab {...props} tabLable={item}/>,
        navigationOptions: {
          title: item
        }
      }
    })
    return navs
  }
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        this._getNavs(),
        {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            scrollEnabled: true,
            style: {
              backgroundColor: '#a67'
            },
            indicatorStyle: {
              height: 2,
              backgroundColor: 'white'
            },
            labelStyle: styles.labelStyle
          }
        }
      )
    )
    return (
      <View style={styles.container}>
        <TabNavigator />
      </View>
    )
  }
}
class PopularTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Tab</Text>
        <Text onPress={() => NavigationUtil.goPage('DetailPage')}>跳转到详情页</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    minWidth: 50
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  }
})