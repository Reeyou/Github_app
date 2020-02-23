export default class BackPress {
  constructor(props) {
    this._hardwareBackPress = this.onHardwarebackPress.bind(this)
    this.props = props
  }
  componentDidMount() {
    if(this.props.backPress) {
      BackHandler.addEventListener('hardwareBackPress',this._hardwareBackPress)
    }
  }
  componentWillUnmount() {
    if(this.props.backPress) {
      BackHandler.removeEventListener('hardwareBackPress',this._hardwareBackPress)
    }
  }
  onHardwarebackPress(e) {
    return this.props.backPress(e)
  }
}