import React,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import {connect} from 'react-redux'
import actions from '../action'
class TrendingPage extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text>TrendingPage</Text>
        <Button title='修改主题' onPress={() => this.props.onThemeChange('orange')} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(null,mapDispatchToProps)(TrendingPage)