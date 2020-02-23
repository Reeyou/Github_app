import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'

export default class TrendingItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { item } = this.props
    if (!item) return null
    let favoriteIcon =
      <TouchableOpacity
        style={{ padding: 6 }}
        onPress={() => {

        }}
        underlayColor={'transparent'}
      >
        <FontAwesome
          name={'star-o'}
          size={26}
          style={{ color: 'red' }}
        />
      </TouchableOpacity>
    let description =   '<p>' + item.description + '</p>'
    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
      >
        <View style={style.cell_container}>
          <Text style={style.title}>{item.fullName}</Text>
          <HTMLView 
            value={description}
            onLinkPress={url => {

            }}
            stylesheet={{
              a: style.description,
              p: style.description
            }}
          />
          <Text style={style.description}>{item.meta}</Text>
          <View style={style.row}>
            <View style={{ flexDirection: 'row'}}>
              <Text>Built in:</Text>
              {item.contributors.map((result, i, arr) => {
                return <Image
                  key={i}
                  style={{ width: 22, height: 22, margin: 0.5 }}
                  source={{ uri: arr[i] }}
                />
              })}
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
    shadowOffset: { width: 0.5, height: 0.5 },
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