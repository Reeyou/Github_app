/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import WelcomePage from './js/pages/WelcomePage'
import AppNavigator from './js/navigators/AppNavigator'

AppRegistry.registerComponent(appName, () => AppNavigator);
