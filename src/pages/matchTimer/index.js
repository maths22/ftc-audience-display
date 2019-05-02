import React, {Component} from 'react'

import overlayable from '../../components/overlayable'
import MatchTimerOverlay from './overlay'
import MatchTimerFull from './full'
import play from '../../sounds'

const Timer = overlayable(MatchTimerFull, MatchTimerOverlay);
export default class MatchTimer extends Component {
  static defaultProps = {
    redScore: 0,
    blueScore: 0,
  }

  constructor(props) {
    super(props)
    this.state = {
      timeDiff: 999
    }
  }

  soundsPlayed = {}

  //THINGS THAT SHOW TIMER: SHOW_MATCH, START_MATCH, ABORT_MATCH

  componentDidMount() {
    if(this.props.actionType === 'START_MATCH') {
      this.startRefresh()
      this.resetSounds()
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.actionType === 'START_MATCH' && prevProps.actionType !== 'START_MATCH') {
      this.startRefresh()
      this.resetSounds()
    } else if(this.props.actionType !== prevProps.actionType) {
      this.stopRefresh()
    }
  }

  componentWillUnmount() {
    this.stopRefresh()
  }

  startRefresh() {
    this.setState({timeDiff: (this.props.now() - this.props.actionTime.getTime()) / 1000})
    this.interval = setInterval(() => {
      this.setState({timeDiff: (this.props.now() - this.props.actionTime.getTime()) / 1000})
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
    let seconds = 0;
    if (timeDiff < 30) {
      seconds = 60 * 3 - timeDiff;
    } else if (timeDiff < 37) {
      seconds = 38 - timeDiff;
    } else {
      seconds = 60 * 3 - (timeDiff - 8);
    }
    if (seconds < 0) {
      return '0:00';
    }
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = '0' + seconds;
    return minutes + ':' + seconds;
  }

  diffToPeriod (timeDiff) {
    if (timeDiff < 30) {
      return 'auto'
    } else if (timeDiff < 38) {
      return 'pickup'
    } else if (timeDiff < 38 + (60 * 2)) {
      return 'teleop'
    } else if (timeDiff < 60 * 3 + 8) {
      return 'endgame'
    } else {
      return 'complete'
    }
  }

  playSounds (timeDiff) {
    if (timeDiff >= 0 && timeDiff < 1 && !this.soundsPlayed['matchStart']) {
      this.soundsPlayed['matchStart'] = true
      if (!this.props.mute) play('matchStart')
    }
    if (timeDiff >= 30 && timeDiff < 31 && !this.soundsPlayed['autoEnd']) {
      this.soundsPlayed['autoEnd'] = true
      if (!this.props.mute) play('autoEnd')
    }
    if (timeDiff >= 32 && timeDiff < 33 && !this.soundsPlayed['controllers']) {
      this.soundsPlayed['controllers'] = true
      if (!this.props.mute) play('controllers')
    }
    if (timeDiff >= 35 && timeDiff < 36 && !this.soundsPlayed['countdown']) {
      this.soundsPlayed['countdown'] = true
      if (!this.props.mute) play('countdown')
    }
    if (timeDiff >= 38 && timeDiff < 39 && !this.soundsPlayed['startTeleop']) {
      this.soundsPlayed['startTeleop'] = true
      if (!this.props.mute) play('startTeleop')
    }
    if (timeDiff >= (38 + 60 * 2) && timeDiff < (38 + 60 * 2) + 1 && !this.soundsPlayed['endgameWarning']) {
      this.soundsPlayed['endgameWarning'] = true
      if (!this.props.mute) play('endgameWarning')
    }
    if (timeDiff >= (8 + 60 * 3) && timeDiff < (8 + 60 * 3) + 1 && !this.soundsPlayed['matchEnd']) {
      this.soundsPlayed['matchEnd'] = true
      if (!this.props.mute) play('matchEnd')
    }
  }

  render() {

    let timeProps = {}

    if (this.props.actionType === 'SHOW_MATCH') {
      timeProps = {
        percentComplete: 0,
        time: '3:00',
        period: 'stopped'
      }
    } else if (this.props.actionType === 'START_MATCH') {
      this.playSounds(this.state.timeDiff)

      timeProps = {
        percentComplete: this.state.timeDiff / (60 * 3),
        time: this.diffToDisplay(this.state.timeDiff),
        period: this.diffToPeriod(this.state.timeDiff),
        showComplete: this.state.timeDiff > 60 * 3 + 8 + 2
      }
    } else if (this.props.actionType === 'ABORT_MATCH') {
      const timeDiff = (this.props.now() - this.props.actionTime.getTime()) / 1000
      if (timeDiff < 1 && !this.soundsPlayed['abortMatch']) {
        this.soundsPlayed['abortMatch'] = true
        if (!this.props.mute) play('abortMatch')
      }
      timeProps = {
        percentComplete: 1,
        time: '0:00',
        period: 'aborted'
      }
    }

    return <Timer {...this.props} {...timeProps} />
  }
}
