import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import NavigationBar from '../component/NavigationBar'
import MORE_MENU from './MORE_MENU'

const THEME_COLOR = '#678'
export default class UserPage extends Component {
  onClick(item) { }
  render() {
    let statuBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      title='最热'
      statuBar={statuBar}
      style={{ backgroundColor: THEME_COLOR }}
    />
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollView>
          <TouchableOpacity
          style={styles.item}
            onPress={() => {
              this.onClick(MORE_MENU.about)
            }}
          >
            <View style={styles.about_left}>
              <Ionicons
                name={MORE_MENU.about.icon}
                size={40}
                style={{
                  marginRIght: 10,
                  color: THEME_COLOR
                }}
              />
              <Text>Reeyou</Text>
            </View>
            <Ionicons
                name={'ios-arrow-forward'}
                size={16}
                style={{
                  marginRIght: 10,
                  alignItems: 'center',
                  color: THEME_COLOR
                }}
              />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    height: 90,
    backgroundColor: THEME_COLOR
  },
  about_left: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})