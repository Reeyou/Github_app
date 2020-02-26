import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types';

export default class BaseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: this.props.projectModal.isFavorite
    }
  }
  static propTypes = {
    projectModal: PropTypes.object,
    onChange: PropTypes.func,
    onFavorite: PropTypes.func
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isFavorite = nextProps.projectModal.isFavorite
    if(prevState.isFavorite !== isFavorite) {
      return {
        isFavorite: isFavorite
      }
    }
    return null
  }

  _FavoriteIcon() {
    const {theme} = this.props
    return <TouchableOpacity
      style={{padding: 6}}
      underlayColor='transparent'
      onPress={() => {
        this.onPressFavorite()
      }}
    >
      <FontAwesome
        name={this.state.isFavorite ? 'star' : 'star-o'}
        size={26}
        style={{color: theme.themeColor}}
      />
    </TouchableOpacity>
  }

  onPressFavorite() {
    this.setFavoriteState(!this.state.isFavorite)
    this.props.onFavorite(this.props.projectModal.item,!this.state.isFavorite)
  }

  setFavoriteState(isFavorite) {
    this.props.projectModal.isFavorite = isFavorite
    this.setState({
      isFavorite: isFavorite
    })
  }

  onItemClick() {
    this.props.onSelect(isFavorite => {
      this.setFavoriteState(isFavorite)
    })
  }
}