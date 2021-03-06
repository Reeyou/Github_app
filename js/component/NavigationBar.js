import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  ViewPropTypes,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  DeviceInfo
} from 'react-native'

// 导航栏及状态栏高度
const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 40;
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;
const STATUS_BAR_HEIGHT = (Platform.OS !== 'ios' || DeviceInfo.isIPhoneX_deprecated) ? 0 : 20;//状态栏的高度

// 设置状态栏所接受的属性
const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string
}
export default class NavigationBar extends Component {
  constructor(props) {
    super(props)
  }

  // 类型检查
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleStyle: ViewPropTypes.style,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element
  }
  // 默认属性
  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false
    }
  }
  render() {
    let statusBar = !this.props.statusBar.hidden ?
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} />
        {/* <StatusBar hidden={false} backgroundColor={'green'} /> */}
      </View> : null;

    let titleView = this.props.titleView ? this.props.titleView :
      <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title}</Text>;

    let content = this.props.hide ? null :
      <View style={styles.navBar}>
        {this.getButtonElement(this.props.leftButton)}
        <View style={[styles.navBarTitleContainer, this.props.titleStyle]}>
          {titleView}
        </View>
        {this.getButtonElement(this.props.rightButton)}
      </View>;
    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    )
  }
  getButtonElement(data) {
    return (
      <View style={styles.navBarButton}>
        {data ? data : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196f3'
  },
  navBarButton: {
    alignItems: 'center'
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: NAV_BAR_HEIGHT
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT
  }
})