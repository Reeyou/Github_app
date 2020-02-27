import React,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import {WebView} from 'react-native-webview'
import NavigationBar from '../component/NavigationBar'
import ViewUtil from '../utils/ViewUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from '../navigators/NavigationUtil'
import ProjectModal from '../modal/projectModal';
import FavoriteDao from '../api/FavoriteDao'
import SafeAreaViewPlus from '../component/SafeAreaViewPlus'

const TRENDING_URL = 'https://github.com/'
const THEME_COLOR = '#678'
export default class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    console.log(this.params)
    const {projectModes, flag} = this.params
    this.url = projectModes.item.html_url || TRENDING_URL+projectModes.item.fullName
    const titile = projectModes.item.full_name || projectModes.item.fullName
    this.favoriteDao = new FavoriteDao(flag)
    this.state={
      title: titile,
      url: this.url,
      canGoBack: false,
      isFavorite: projectModes.isFavorite
    }
  }
  goBack() {
    if(this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }
  onFavoriteClick() {
    const {projectModes,callback} = this.params
    const isFavorite = projectModes.isFavorite = !projectModes.isFavorite
    callback(isFavorite)
    this.setState({
      isFavorite: isFavorite
    })
    let keys = project.item.fullName ? project.item.fullName :project.item.id.toString()
    if(ProjectModal.isFavorite) {
      this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModes.item))
    } else {
      this.favoriteDao.removeFavoriteItem(key)
    }

  }
  renderRightButton() {
    return <View>
      <TouchableOpacity
        onPress={() => {
          this.onFavoriteClick()
        }}
      >
        <FontAwesome
          name={this.state.isFavorite ? 'star' : 'star-o'}
          size={20}
          style={{color: 'white',marginRight: 10}}
        />
      </TouchableOpacity>
      {
        ViewUtil.getShareButton(() => {

        })
      }
    </View>
  }
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    })
  }
  render() {
    const {theme} = this.params
    let statuBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    const titleLayoutStyle = this.state.title.legtn > 20 ? {paddingRight: 30} : null 
    let navigationBar = <NavigationBar
      title={this.state.title}
      titleStyle={titleLayoutStyle}
      leftButton={ViewUtil.getLeftBackButton(() => this.goBack())}
      rightButton={this.renderRightButton()}
      statuBar={statuBar}
      style={theme.styles.navBar}
    />
    return (
      <SafeAreaViewPlus
        topColor={theme.themeColor}
      >
        {navigationBar}
        <WebView
          ref={webView => this.webView = webView}
          startInLoadingState={true}
          onNavigationStateChange={e=>this.onNavigationStateChange(e)}
          source={{uri: this.state.url}}
        />
      </SafeAreaViewPlus>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
})