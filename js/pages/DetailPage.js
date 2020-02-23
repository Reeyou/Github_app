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

const TRENDING_URL = 'https://github.com/'
const THEME_COLOR = '#678'
export default class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    console.log(this.params)
    const {projectModes} = this.params
    this.url = projectModes.html_url || TRENDING_URL+projectModes.fullName
    const titile = projectModes.full_name || projectModes.fullName
    this.state={
      title: titile,
      url: this.url,
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
  renderRightButton() {
    return <View>
      <TouchableOpacity
        onPress={() => {

        }}
      >
        <FontAwesome
          name={'star-o'}
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
      style={{backgroundColor: THEME_COLOR}}
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