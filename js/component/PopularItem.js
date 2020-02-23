import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { item } = this.props
    if (!item || !item.owner) return null
    let favoriteIcon = 
    <TouchableOpacity 
    style={{padding: 6}}
      onPress={() => {

      }}
      underlayColor={'transparent'}
    >
      <FontAwesome
        name={'star-o'}
        size={26}
        style={{color: 'red'}}
      />
    </TouchableOpacity>

    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
      >
        <View style={style.cell_container}>
          <Text style={style.title}>{item.full_name}</Text>
          <Text style={style.description}>{item.description}</Text>
          <View style={style.row}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Author:</Text>
              <Image
                style={{ width: 22, height: 22 }}
                source={{ uri: item.owner.avatar_url }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Star:</Text>
              <Text>{item.stargazers_count}</Text>
            </View>
            {favoriteIcon}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
const style = StyleSheet.create({
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  }
})