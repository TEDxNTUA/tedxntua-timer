import { h, Component } from 'preact'
import { RemoteControl, BtnControl } from '@tdiam/remotecontrol-preact'

import settings from '~/settings'


class Remote extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <RemoteControl
        socketUrl={ settings.SOCKET_URL }>
        <BtnControl action="resetTimer">Reset to 20 min</BtnControl>
      </RemoteControl>
    )
  }
}

export default Remote
