import React, { Component } from 'react'
import {
  View,
  Linking
} from 'react-native'
import MORE_MENU from '../../config/MORE_MENU'
import GlobalStyles from '../../res/GlobalStyles';
import ViewUtil from '../../utils/ViewUtil';
import NavigationUtil from '../../navigators/NavigationUtil';
import AboutCommon, { ABOUT_TYPE } from './AboutCommon';
import config from '../../res/data/config'

export default class AboutPage extends Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    this.aboutCommon = new AboutCommon({
      ...this.params,
      navigation: this.props.navigation,
      type: ABOUT_TYPE.about
    }, data => {
      this.setState({ ...data })
    })
    this.state = {
      data: config
    }
  }
  onClick(menu) {
    const {theme} = this.params;
    let RouteName, params = {theme}
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage'
        params.title = '教程'
        params.url = 'https://coding.m.imooc.com/classindex.html?cid=89'
        break;
        case MORE_MENU.About_Author:
        RouteName = 'AboutMePage'
        break;
      case MORE_MENU.Feedback:
          const url = 'mailto://crazycodeboy@gmail.com'
          Linking.canOpenURL(url)
          .then(support=> {
            if(!support) {
              console.log('can\'t handle url:' + url)
            } else {
              Linking.openURL(url)
            }
          }).catch(e => {
            console.error("An error occurred", e)
          });
          break;
    }
    console.log(RouteName)
    if (RouteName) {
      NavigationUtil.goPage(RouteName, params)
    }
  }
  getItem(menu) {
    const {theme} = this.params;
    return ViewUtil.getMenuItem(() => this.onClick(menu), menu, theme.themeColor)
  }
  render() {
    const content = <View>
      {this.getItem(MORE_MENU.Tutorial)}
      <View style={GlobalStyles.line} />
      {this.getItem(MORE_MENU.About_Author)}
      <View style={GlobalStyles.line} />
      {this.getItem(MORE_MENU.Feedback)}
    </View>;
    return this.aboutCommon.render(content, this.state.data.app);
  }
}
