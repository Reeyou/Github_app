import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomePage from '../pages/HomePage'
import WelcomePage from '../pages/WelcomePage'
import DetailPage from '../pages/DetailPage'
import FetchPage from '../pages/FetchPage'

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
      
    },
    FetchPage: {
      screen: FetchPage,
      
    }
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