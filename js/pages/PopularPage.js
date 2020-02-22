import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import NavigationUtil from '../navigators/NavigationUtil';
import { connect } from 'react-redux'
import actions from '../action/index'
import PopularItem from '../common/PopularItem'
import Toast from 'react-native-easy-toast'

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
    const TabNavigator = createAppContainer(
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
    return (
      <View style={styles.tab}>
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
    this.loadData()
  }
  loadData(loadMore) {
    const { onLoadPopularData, onLoadPopularMoreData } = this.props
    const store = this.getStore()

    const url = this.getFetchUrl(this.storeName)
    if(loadMore) {
      onLoadPopularMoreData(this.storeName, ++store.pageIndex,pageSize, store.items, callback => {
        this.refs.toast.show('没有更多了')
      })
    } else {
      onLoadPopularData(this.storeName, url)
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
      item={item}
      onSelect={() => {

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
          keyExtractor={item => "" + item.id}
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
  onLoadPopularData: (storeName, url,pageSize) => dispatch(actions.onLoadPopularData(storeName, url,pageSize)),
  onLoadPopularMoreData: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadPopularMoreData(storeName, pageIndex, pageSize, items, callback))
})
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

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