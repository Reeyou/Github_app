import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import TabNavigator from '../navigators/TabNavigators'
import NavigationUtil from '../navigators/NavigationUtil'
import {connect} from 'react-redux';
import CustomTheme from './CustomTheme';
import actions from '../action';

class HomePage extends Component {
  constructor(props) {
    super(props)
  }

  renderCustomThemeView() {
    const {customThemeViewVisible, onShowCustomThemeView} = this.props;
    return (<CustomTheme
        visible={customThemeViewVisible}
        {...this.props}
        onClose={() => onShowCustomThemeView(false)}
    />);
}
  render() {
    // FIX TabNavigator导航页无法跳转到外部导航页问题
    NavigationUtil.navigation = this.props.navigation
    return (
      
      <View style={{flex: 1}}>
            <TabNavigator />
            {this.renderCustomThemeView()}
        </View>
    )
  }
}
const mapStateToProps = state => ({
  nav: state.nav,
  customThemeViewVisible: state.theme.customThemeViewVisible,
  theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
  onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})