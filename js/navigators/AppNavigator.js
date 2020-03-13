import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomePage from '../pages/HomePage'
import WelcomePage from '../pages/WelcomePage'
import DetailPage from '../pages/DetailPage'
import WebViewPage from '../pages/WebViewPage'
import AboutPage from '../pages/About/AboutPage'
import AboutMePage from '../pages/About/AboutMePage'
import CustomKeyPage from '../pages/CustomKeyPage'
import SortKeyPage from '../pages/SortKeyPage'
import CodePushPage from '../pages/CodePushPage'

const InitNavigator = createStackNavigator(
  {
    WelcomePage: {
      screen: WelcomePage,
      navigationOptions: {
        header: null
      } 
    }
  }
)

const MainNavigator = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        header: null
      }
    },
    DetailPage: {
      screen: DetailPage,
      navigationOptions: {
        header: null
      }
    },
    WebViewPage: {
      screen: WebViewPage,
      navigationOptions: {
        header: null
      }
    },
    AboutPage: {
      screen: AboutPage,
      navigationOptions: {
        header: null
      }
    },
    AboutMePage: {
      screen: AboutMePage,
      navigationOptions: {
        header: null
      }
    },
    CustomKeyPage: {
      screen: CustomKeyPage,
      navigationOptions: {
        header: null
      }
    },
    SortKeyPage: {
      screen: SortKeyPage,
      navigationOptions: {
        header: null
      }
    },
    CodePushPage: {
      screen: CodePushPage, 
      navigationOptions: {
        header: null
      }
    },
  }
)


export default createAppContainer(createSwitchNavigator(
  {
    Init: InitNavigator,
    Main: MainNavigator
  },
  {
    navigationOptions: {
      header: null
    }
  }
))