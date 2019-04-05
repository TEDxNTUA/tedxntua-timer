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

  /**
   * Returns a function that adds `dt` seconds to the timer.
   */
  timeAdder = (dt) => {
    return () => {
      const rem = this.state.remainingSeconds
      // don't reduce time below zero
      if (rem + dt < 0) return
      this.setState({
        remainingSeconds: rem + dt,
      })
    }
  }

  resetTime = () => {
    this.setState({ remainingSeconds: settings.INITIAL_TIME })
  }

  componentDidMount() {
    // Countdown interval
    this.wi = window.setInterval(this.timeAdder(-1), 1000)
    document.addEventListener("keydown", event => {
      if (event.keyCode === 32 || event.keyCode === 82) { // space or R
        this.resetTime()
      }
      if (event.keyCode === 61) { // plus
        this.timeAdder(60)()
      }
      if (event.keyCode === 173) { // minus
        this.timeAdder(-60)()
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
