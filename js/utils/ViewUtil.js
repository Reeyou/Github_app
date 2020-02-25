import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ViewUtil {

  /**
   * 获取设置页的item
   * @param {*} callback 
   * @param {*} text 文字
   * @param {*} color 图标着色
   * @param {*} Icons react-native-vector-icons
   * @param {*} icon 左侧图标
   * @param {*} expandableIco 右侧图标
   */
  static getSettingItem(callback, text, color, Icons, icon, expandableIco) {
    return (
      <TouchableOpacity
        onPress={callback}
        style={styles.setting_item_container}
      >
        <View
          style={{ alignItems: 'center', flexDirection: 'row' }}
        >
          {Icons && icon ?
            <Icons
              name={icon}
              size={16}
              style={{ color: color, marginRight: 10 }}
            /> :
            <View style={{ opacity: 1, width: 16, height: 16, marginRight: 10 }}></View>
          }
          <Text>{text}</Text>
        </View>
        <Icons
          name={expandableIco ? expandableIco : 'ios-arrow-forward'}
          size={16}
          style={{
            marginRight: 10,
            alignItems: 'center',
            color: color
          }}
        />
      </TouchableOpacity>
    )
  }


  /**
   * 
   * @param {*} callback 
   * @param {*} menu 
   * @param {*} color 
   * @param {*} expandableIco 
   */
  static getMenuItem(callback, menu, color, expandableIco) {
    return ViewUtil.getSettingItem(callback, menu.name, color, menu.Icons, menu.icon, expandableIco)
  }

  static getLeftBackButton(callback) {
    return <TouchableOpacity
      style={{ padding: 8, paddingLeft: 12 }}
      onPress={callback}
    >
      <Ionicons
        name={'ios-arrow-back'}
        size={26}
        style={{ color: 'white' }}
      />
    </TouchableOpacity>
  }
  static getShareButton(callback) {
    return <TouchableOpacity
      underlayColor={'transparent'}
      onPress={callback}
    >
      <Ionicons
        name={'md-share'}
        size={20}
        style={{ opacity: 10, marginRight: 10, color: 'white' }}
      />
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  setting_item_container: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})