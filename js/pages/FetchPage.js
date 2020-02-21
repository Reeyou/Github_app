import React,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native'
import DataStore from '../api/DataStore'

export default class FetchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: ''
    }
    this.DataStore = new DataStore()
  }
  loadData() {
    // http://api.github.com/search/repositories?q=java
    let url = `http://api.github.com/search/repositories?q=${this.searchKey}`
    this.DataStore.fetchData('http://api.github.com/search/repositories?q=java')
    .then(data => {
      let showData = `初次加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`
      this.setState({
        showText: showData
      })
    })
    .catch(e => {
      this.setState({
        showText: e.toString()
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>FetchPage</Text>
        <View style={styles.input_container}>
          <TextInput style={styles.Input} onChangeText={(text) => {this.searchKey = text}} />
          <Button title='获取' onPress={() => {this.loadData()}}/>
        </View>
        <Text>{this.state.showText}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  Input: {
    height: 30,
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10
  }
})