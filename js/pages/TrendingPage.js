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

const THEME_COLOR = '#678'
const TIME_SPAN_CHANGE = 'TIME_SPAN_CHANGE'
export default class TrendingPage extends Component {
  constructor(props) {
    super(props)
    this.tabList = ['javascript', 'nodejs', 'php', 'java']
    this.state = {
      timeSpan: TimeSpans[0]
    }
  }
  _getTabs() {
    const tabs = {}
    this.tabList.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <TrendingTabPage
          {...props}
          timeSpan={this.state.timeSpan}
          tabLable={item}
        />,
        navigationOptions: {
          title: item
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
    if(!this.tabNav) {
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
    let statuBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      titleView={this.renderTitleView()}
      statuBar={statuBar}
      style={{ backgroundColor: THEME_COLOR }}
    />
    const TabNavigator = this._tabNav()
    return (
      <View style={styles.tab}>
        {navigationBar}
        <TabNavigator />
        {this.renderTrendingDialog()}
      </View>
    )
  }
}
const pageSize = 10
class TrendingTab extends Component {
  constructor(props) {
    super(props)
    const { tabLable, timeSpan } = this.props
    this.storeName = tabLable
    this.timeSpan = timeSpan
  }
  componentDidMount() {
    this.loadData()
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(TIME_SPAN_CHANGE,timeSpan => {
      this.timeSpan = timeSpan
      this.loadData()
    })
  }
  componentWillUnmount() {
    if(this.timeSpanChangeListener) {
      this.timeSpanChangeListener.remove()
    }
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
    const URL = `http://github.com/trending/`
    const QUERY_STR = "?since=daily"
    return URL + key + '?' + this.timeSpan.searchText

  }
  renderItem(data) {
    const item = data.item
    return <TrendingItem
      item={item}
      onSelect={() => {
        NavigationUtil.goPage('DetailPage',{projectModes: item})
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
              titleColor={'red'}
              colors={['red']}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={'red'}
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