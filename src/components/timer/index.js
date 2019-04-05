import { h, Component } from 'preact'

import './style'
import settings from '~/settings'
import formatTime from '~/utils/formatTime'


class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingSeconds: settings.INITIAL_TIME,
      message: '',
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

  resetTime = () => {
    this.setState({ remainingSeconds: settings.INITIAL_TIME })
  }

  componentDidMount() {
    // Countdown interval
    this.wi = window.setInterval(this.decrease, 1000)
    document.addEventListener("keydown", event => {
      if (event.keyCode === 32 || event.keyCode === 82) { // space or R
        this.resetTime()
      }
    })
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
        <time datetime={ isoDuration } class={ timerClass }>
          { hhmmss }
        </time>
      </div>
    )
  }
}

export default Timer
