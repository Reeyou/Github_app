import React, { Component } from 'react'
import {
  View,
  Linking,
  Clipboard
} from 'react-native'
import MORE_MENU from '../../config/MORE_MENU'
import GlobalStyles from '../../res/GlobalStyles';
import ViewUtil from '../../utils/ViewUtil';
import NavigationUtil from '../../navigators/NavigationUtil';
import AboutCommon, { ABOUT_TYPE } from './AboutCommon';
import config from '../../res/data/config'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-easy-toast'

const THEME_COLOR = '#678'
export default class AboutMePage extends Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    this.aboutCommon = new AboutCommon({
      ...this.params,
      navigation: this.props.navigation,
      type: ABOUT_TYPE.about_me
    }, data => {
      this.setState({ ...data })
    })
    this.state = {
      data: config,
      showTutorial: true,
      showBlog: false,
      showQQ: false,
      showContact: false
    }
  }
  onClick(tab) {
    if(!tab) return
    const {theme} = this.params
    if(tab.url) {
      NavigationUtil.goPage('WebViewPage',{
        title: tab.title,
        url: tab.url,
        theme
      })
    }
    if (tab.account && tab.account.indexOf('@') > -1) {
      let url = 'mailto://' + tab.account;
      Linking.canOpenURL(url).then(supported => {
          if (!supported) {
              console.log('Can\'t handle url: ' + url);
          } else {
              return Linking.openURL(url);
          }
      }).catch(err => console.error('An error occurred', err));
      return;
  }
  if (tab.account) {
      Clipboard.setString(tab.account);
      this.toast.show(tab.title + tab.account + '已复制到剪切板。');
  }
  }
  getItem(menu) {
    return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR)
  }
  _item(data, isShow, key) {
    const {theme} = this.params;
    return ViewUtil.getSettingItem(() => {
      this.setState({
        [key]: !this.state[key]
      });
    }, data.name, theme.themeColor, Ionicons, data.icon, isShow ? 'ios-arrow-up' : 'ios-arrow-down')
  }
  /**
   * 显示列表数据
   * @param {*} dic 
   * @param {*} isShowAccount 
   */
  renderItems(dic, isShowAccount) {
    if (!dic) return null;
    const { theme } = this.params;
    let views = [];
    for (let i in dic) {
      let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
      views.push(
        <View key={i}>
          {ViewUtil.getSettingItem(() => this.onClick(dic[i]), title, theme.themeColor)}
          <View style={GlobalStyles.line} />
        </View>
      )
    }
    return views;
  }

  render() {
    const {
      data,
      showTutorial,
      showBlog,
      showQQ,
      showContact 
    } = this.state

    const content = <View>
      {this._item(data.aboutMe.Tutorial, showTutorial, 'showTutorial')}
      <View style={GlobalStyles.line} />
      {/* {showTutorial ? this.renderItems(data.aboutMe.Tutorial.items) : null} */}

      {this._item(data.aboutMe.Blog, showBlog, 'showBlog')}
      <View style={GlobalStyles.line} />
      {/* {showBlog ? this.renderItems(data.aboutMe.Blog.items) : null} */}

      {this._item(data.aboutMe.QQ, showQQ, 'showQQ')}
      <View style={GlobalStyles.line} />
      {/* {showQQ ? this.renderItems(data.aboutMe.QQ.items, true) : null} */}

      {this._item(data.aboutMe.Contact, showContact, 'showContact')}
      <View style={GlobalStyles.line} />
      {/* {showContact ? this.renderItems(data.aboutMe.Contact.items, true) : null} */}
    </View>;
    return <View style={{flex: 1}}>
    {this.aboutCommon.render(content, data.author)}
    <Toast ref={toast => this.toast = toast}
           position={'center'}
    />
</View>
  }
}
