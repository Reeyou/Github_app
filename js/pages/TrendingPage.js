import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { connect } from 'react-redux'
import actions from '../action/index'
import TrendingItem from '../component/TrendingItem'
import NavigationBar from '../component/NavigationBar'
import Toast from 'react-native-easy-toast'
import TrendingDialog, { TimeSpans } from '../component/TrendingDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationUtil from '../navigators/NavigationUtil';
import ArrayUtil from '../utils/ArrayUtil';
import { FLAG_LANGUAGE } from '../api/LanguageDao';
import EventBus from 'react-native-event-bus';
import EventTypes from '../utils/EventTypes';

const THEME_COLOR = '#678'
const TIME_SPAN_CHANGE = 'TIME_SPAN_CHANGE'
class TrendingPage extends Component {
  constructor(props) {
    super(props)
    const { onLoadLanguage } = this.props
    onLoadLanguage(FLAG_LANGUAGE.flag_key)
    this.state = {
      timeSpan: TimeSpans[0]
    }
    this.prevKeys = []
  }
  _getTabs() {
    const tabs = {}
    const { keys, theme } = this.props
    this.prevKeys = keys
    keys.forEach((item, index) => {
      if (item.checked) {
        tabs[`tab${index}`] = {
          screen: props => <TrendingTabPage
            {...props}
            timeSpan={this.state.timeSpan}
            tabLable={item.name}
            theme={theme}
          />,
          navigationOptions: {
            title: item.name
          }
        }
      }
    })
    return tabs
  }
  renderTitleView() {
    return (
      <View>
        <TouchableOpacity
          underlayColor='transparent'
          onPress={() => this.dialog.onShow()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '400' }}>
              趋势 {this.state.timeSpan.showText}
            </Text>
            <MaterialIcons
              name={'arrow-drop-down'}
              size={22}
              style={{ color: 'white' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  onSelectTimeSpan(tab) {
    this.dialog.onDismiss()
    this.setState({
      timeSpan: tab
    })
    DeviceEventEmitter.emit(TIME_SPAN_CHANGE, tab)
  }
  renderTrendingDialog() {
    return <TrendingDialog
      ref={dialog => this.dialog = dialog}
      onSelect={tab => this.onSelectTimeSpan(tab)}
    />
  }

  _tabNav() {
    const {theme} = this.props;
        //注意：主题发生变化需要重新渲染top tab
    if (theme !== this.theme || !this.tabNav || !ArrayUtil.isEqual(this.prevKeys, this.props.keys)) {
      this.theme = theme;
      this.tabNav = createAppContainer(
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
    }
    return this.tabNav
  }
  render() {
    const { keys, theme } = this.props
    let statuBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      titleView={this.renderTitleView()}
      statuBar={statuBar}
      style={theme.styles.navBar}
    />
    const TabNavigator = keys.length ? this._tabNav() : null
    return (
      <View style={styles.tab}>
        {navigationBar}
        {TabNavigator && <TabNavigator />}
        {this.renderTrendingDialog()}
      </View>
    )
  }
}

const mapTrendingStateToProps = state => ({
  keys: state.language.languages,
  theme: state.theme.theme
})
const mapTrendingDispatchProps = dispatch => ({
  onLoadLanguage: flag => dispatch(actions.onLoadLanguage(flag))
})
export default connect(mapTrendingStateToProps, mapTrendingDispatchProps)(TrendingPage)
const pageSize = 10
class TrendingTab extends Component {
  constructor(props) {
    super(props)
    const { tabLable, timeSpan } = this.props
    this.storeName = tabLable
    this.timeSpan = timeSpan
    this.isFavoriteChanged = false;
  }
  componentDidMount() {
    // this.loadData()
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(TIME_SPAN_CHANGE, timeSpan => {
      this.timeSpan = timeSpan
      // this.loadData()
    });
    // EventBus.getInstance().addListener(EventTypes.favoriteChanged_trending, this.favoriteChangeListener = () => {
    //   this.isFavoriteChanged = true;
    // });
    // EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
    //   if (data.to === 1 && this.isFavoriteChanged) {
    //     this.loadData(null, true);
    //   }
    // });
  }
  componentWillUnmount() {
    if (this.timeSpanChangeListener) {
      this.timeSpanChangeListener.remove()
    }
    // EventBus.getInstance().removeListener(this.favoriteChangeListener);
    // EventBus.getInstance().removeListener(this.bottomTabSelectListener);
  }
  loadData(loadMore) {
    const { onRefreshTrending, onLoadTrendingMoreData } = this.props
    const store = this.getStore()

    const url = this.getFetchUrl(this.storeName)
    if (loadMore) {
      onLoadTrendingMoreData(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
        this.refs.toast.show('没有更多了')
      })
    } else {
      onRefreshTrending(this.storeName, url)
    }

  }
  getStore() {
    const { trending } = this.props
    let store = trending[this.storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],
        hideLoadingMore: true
      }
    }
    return store
  }
  getFetchUrl(key) {
    // const URL = `http://github.com/trending/`
    // return URL + key + '?' + this.timeSpan.searchText

  }
  renderItem(data) {
    const item = data.item
    const { theme } = this.props
    return <TrendingItem
      item={item}
      onSelect={() => {
        NavigationUtil.goPage('DetailPage', { projectModes: item, theme })
      }}
    />
  }
  genIndicator() {
    return this.getStore().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.activityIndicator}
        />
        <Text>正在加载更多...</Text>
      </View>
  }
  render() {
    let store = this.getStore()
    const { theme } = this.props
    return (
      <View style={styles.container}>
        {/* <Text onPress={() => NavigationUtil.goPage('DetailPage', { navigation: this.props.navigation })}>跳转到详情页</Text>
        <Text onPress={() => NavigationUtil.goPage('FetchPage', { navigation: this.props.navigation })}>Fetch使用</Text> */}
        <FlatList
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => "" + (item.id || item.fullName)}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={theme.themeColor}
              colors={[theme.themeColor]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={theme.themeColor}
            />
          }
          ListFooterComponent={() =>
            this.genIndicator()
          }
          onEndReached={() => {
            setTimeout(() => {
              if (this.canLoadMore) {
                this.loadData(true)
                this.canLoadMore = false
              }
            }, 100)
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    )
  }
}
const mapStateToProps = state => ({
  trending: state.trending
})
const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
  onLoadTrendingMoreData: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadTrendingMoreData(storeName, pageIndex, pageSize, items, callback))
})
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)

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
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  activityIndicator: {
    color: 'red',
    margin: 10
  }
})