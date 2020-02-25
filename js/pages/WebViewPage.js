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

const TRENDING_URL = 'https://github.com/'
const THEME_COLOR = '#678'
export default class WebViewPage extends Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    const {title,url} = this.params
    this.state={
      title: title,
      url: url,
      canGoBack: false
    }
  }
  goBack() {
    if(this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    })
  }
  render() {
    let navigationBar = <NavigationBar
      title={this.state.title}
      style={{backgroundColor: THEME_COLOR}}
      leftButton={ViewUtil.getLeftBackButton(() => {this.goBack()})}
    />
    return (
      <View style={styles.container}>
        {navigationBar}
        <WebView
          ref={webView => this.webView = webView}
          startInLoadingState={true}
          onNavigationStateChange={e=>this.onNavigationStateChange(e)}
          source={{uri: this.state.url}}
        />
      </View>
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