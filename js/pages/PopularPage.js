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
    this.tabList = ['Java','Javascript','nodejs','React','Vue','ReactNative',]
  }
  _getTabs() {
    const tabs = {}
    this.tabList.forEach((item,index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTab {...props} tabLable={item}/>,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        this._getTabs(),
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
      <View style={styles.tab}>
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
        <Text onPress={() => NavigationUtil.goPage('DetailPage',{navigation: this.props.navigation})}>跳转到详情页</Text>
        <Text onPress={() => NavigationUtil.goPage('FetchPage',{navigation: this.props.navigation})}>Fetch使用</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  tab: {
    flex: 1,
  },
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
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