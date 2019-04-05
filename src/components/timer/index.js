import { h, Component } from 'preact'
import { RemoteControlReceiver } from '@tdiam/remotecontrol-preact'

import './style'
import settings from '~/settings'
import formatTime from '~/utils/formatTime'


class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingSeconds: null,
      message: '',
    }
  }

  handleControl = (type, payload) => {
    if (type === 'data') {
      this.setState(payload)
    }
  }

  decrease = () => {
    const rem = this.state.remainingSeconds
    if (rem > 0) {
      this.setState({
        remainingSeconds: rem - 1,
      })
    }
  }

  componentDidMount() {
    // Countdown interval
    this.wi = window.setInterval(this.decrease, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.wi)
  }

  render(_props, { remainingSeconds }) {
    const { hhmmss, isoDuration } = formatTime(remainingSeconds)
    const timerClass =
      (remainingSeconds < settings.HIGHLIGHT_WHEN_UNDER_X_SECONDS)
      ? 'pulsate'
      : ''
    return (
      <div>
        <RemoteControlReceiver
          socketUrl={ settings.SOCKET_URL }
          onControl={ this.handleControl } />
        { remainingSeconds != null && (
          <time datetime={ isoDuration } class={ timerClass }>
            { hhmmss }
          </time>
        )}
      </div>
    )
  }
}

export default Timer
