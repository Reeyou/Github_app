import React,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'

export default class PopularPage extends Component {
  
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        {
          PopularTab1: {
            screen: PopularTab,
            navigationOptions: {
              title: 'Tab1'
            }
          },
          PopularTab2: {
            screen: PopularTab,
            navigationOptions: {
              title: 'Tab2'
            }
          },
          PopularTab3: {
            screen: PopularTab,
            navigationOptions: {
              title: 'Tab3'
            }
          },
          // PopularTab4: {
          //   screen: PopularTab,
          //   navigationOptions: {
          //     title: 'Tab4'
          //   }
          // },
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
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})