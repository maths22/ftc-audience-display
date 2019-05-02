import React, {Component} from 'react'

import overlayable from '../../components/overlayable'
import TimeoutOverlay from './overlay'
import TimeoutFull from './full'
import play from '../../sounds'

const Timer = overlayable(TimeoutFull, TimeoutOverlay);
export default class Timeout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeDiff: 999
    }
  }

  soundsPlayed = {}

  //THINGS THAT SHOW TIMER: SHOW_MATCH, START_MATCH, ABORT_MATCH

  componentDidMount() {
      this.startRefresh()
      this.resetSounds()
  }

  componentDidUpdate(prevProps) {
    if(this.props.timeoutStart !== prevProps.timeoutStart) {
      this.resetSounds()
    }
  }

  componentWillUnmount() {
    this.stopRefresh()
  }

  startRefresh() {
    this.setState({timeDiff: (this.props.now() - this.props.timeoutStart) / 1000})
    if(this.interval) clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.setState({timeDiff: (this.props.now() - this.props.timeoutStart) / 1000})
    }, 100)
  }

  stopRefresh() {
    if(this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  resetSounds() {
    this.soundsPlayed = {}
  }

  diffToDisplay (timeDiff) {
    timeDiff = timeDiff - 0.99

    let seconds = this.props.timeoutDuration / 1000 - timeDiff
    if (seconds < 0) {
      return '0:00';
    }
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = '0' + seconds;
    return minutes + ':' + seconds;
  }

  diffToAllianceDisplay (timeDiff) {
    if(this.props.timeoutDuration === 0) {
      return '';
    }
    // If the timeout duration is not exactly 5 min, there must be an alliance timeout called
    if(this.props.timeoutDuration !== 300 * 1000) {
      return 'Allliance timeout called';
    }
    timeDiff = timeDiff - 0.99
    let seconds = (this.props.timeoutDuration / 1000 - 60 * 2) - timeDiff
    if (seconds < 0) {
      return 'Alliance timeout window expired';
    }
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = '0' + seconds;
    return 'Alliance Timeout Window:\n' + minutes + ':' + seconds;
  }

  playSounds (timeDiff) {
    if (timeDiff >= 0 && timeDiff < 1 && !this.soundsPlayed['matchStart']) {
      this.soundsPlayed['matchStart'] = true
      if (!this.props.mute) play('matchStart')
    }
    if (timeDiff >= this.props.timeoutDuration / 1000 && timeDiff < this.props.timeoutDuration / 1000 + 1 && !this.soundsPlayed['matchEnd']) {
      this.soundsPlayed['matchEnd'] = true
      if (!this.props.mute) play('matchEnd')
    }
  }

  render() {
    const timeProps = {
      time: this.diffToDisplay(this.state.timeDiff),
      allianceTimeout: this.diffToAllianceDisplay(this.state.timeDiff)
    }

    this.playSounds(this.state.timeDiff)

    return <Timer {...this.props} {...timeProps} />
  }
}
