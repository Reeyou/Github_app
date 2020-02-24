import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  DeviceInfo
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { connect } from 'react-redux'
import actions from '../action/index'
import PopularItem from '../component/PopularItem'
import NavigationBar from '../component/NavigationBar'
import Toast from 'react-native-easy-toast'
import FavoriteDao from '../api/FavoriteDao'
import FavoriteUtil from '../utils/favoriteUtil';
import { FLAG_STORAGE } from '../api/DataStore';

const favoriteDao = new FavoriteDao(FAVORITE_STORAGE.flag_popular)
const THEME_COLOR = '#678'
export default class PopularPage extends Component {
  constructor(props) {
    super(props)
    this.tabList = ['java', 'Javascript', 'nodejs', 'React', 'Vue', 'ReactNative',]
  }
  _getTabs() {
    const tabs = {}
    this.tabList.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLable={item} />,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }
  render() {
    let statuBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      title='最热'
      statuBar={statuBar}
      style={{backgroundColor: THEME_COLOR}}
    />
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        this._getTabs(),
        {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            scrollEnabled: true,
            style: {
              backgroundColor: '#a67',
              height: 50
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
    return (
      <View style={styles.tab}>
        {navigationBar}
        <TabNavigator />
      </View>
    )
  }
}
const pageSize = 10
class PopularTab extends Component {
  constructor(props) {
    super(props)
    const { tabLable } = this.props
    this.storeName = tabLable
  }
  componentDidMount() {
    // this.loadData()
  }
  loadData(loadMore) {
    const { onLoadPopularData, onLoadPopularMoreData } = this.props
    const store = this.getStore()

    const url = this.getFetchUrl(this.storeName)
    if(loadMore) {
      onLoadPopularMoreData(this.storeName, ++store.pageIndex,pageSize, store.items,favoriteDao, callback => {
        this.refs.toast.show('没有更多了')
      })
    } else {
      onLoadPopularData(this.storeName, url, favoriteDao)
    }
    
  }
  getStore() {
    const {popular} = this.props
    let store = popular[this.storeName]
    if(!store) {
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
    const URL = `http://api.github.com/search/repositories?q=`
    const QUERY_STR = "&sort=stars"
    return URL + key + QUERY_STR

  }
  renderItem(data) {
    const item = data.item
    return <PopularItem
      projectModal={item}
      onSelect={() => {
        NavigationUtil.goPage('DetailPage',{projectModes: item})
      }}
      onFavorite={(item,isFavorite) => {
        FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_popular)
      }}
    />
  }
  genIndicator() {
    return this.getStore().hideLoadingMore?null:
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
          keyExtractor={item => "" + item.item.id}
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
            setTimeout(()=> {
              if(this.canLoadMore) {
                this.loadData(true)
                this.canLoadMore = false
              }
            },100) 
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true
          }}
        />
        <Toast ref={'toast'} position={'center'}/>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  popular: state.popular
})
const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url,pageSize,favoriteDao) => dispatch(actions.onLoadPopularData(storeName, url,pageSize,favoriteDao)),
  onLoadPopularMoreData: (storeName, pageIndex, pageSize, items,favoriteDao, callback) => dispatch(actions.onLoadPopularMoreData(storeName, pageIndex, pageSize, items,favoriteDao, callback))
})
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    marginTop: DeviceInfo.isIphoneX_deprecated? 30: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabStyle: {
    // minWidth: 50
    padding: 0
  },
  labelStyle: {
    fontSize: 13,
    margin: 0
    // marginTop: 6,
    // marginBottom: 6
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  activityIndicator: {
    color: 'red',
    margin: 10
  }
})