import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './animation.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import Panel from '../../layout/panel'
import Pill from '../../layout/pill'
import animationBackground from './graphics/animation-background.png'
import redLander from './graphics/red-lander.png'
import blueLander from './graphics/blue-lander.png'
import classnames from 'classnames'
import play from '../../sounds'

export default class MatchResultsAnimation extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    matchName: PropTypes.string,
    blueRecord: PropTypes.number,
    blueWonSeries: PropTypes.bool,
    redRecord: PropTypes.number,
    redWonSeries: PropTypes.bool,
    blueSeed: PropTypes.number,
    redSeed: PropTypes.number,
    blueAlliance: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
      ranking: PropTypes.number,
      rankMove: PropTypes.string
    })),
    redAlliance: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
      ranking: PropTypes.number,
      rankMove: PropTypes.string
    })),
    winner: PropTypes.string,
    redHighScore: PropTypes.bool,
    redScore: PropTypes.number,
    blueHighScore: PropTypes.bool,
    blueScore: PropTypes.number,
    redScoreBreakdown: PropTypes.arrayOf(PropTypes.array),
    blueScoreBreakdown:PropTypes.arrayOf(PropTypes.array),
  }

  componentDidMount() {
    window.setTimeout(() => play('announceScores'), 800)
  }

  render() {
    console.log(this.props.winner)
    return (
      <div className={styles.wrapper} style={{
        '--red-duration': this.props.winner !== 'blue' ? '2s' : '3.5s',
        '--blue-duration': this.props.winner !== 'red' ? '2s' : '3.5s',
      }}>
        <div className={styles.background} style={{backgroundImage: `url(${animationBackground})`}}/>
        <div className={styles.redHWrapper}>
          <div className={styles.redVWrapper}>
            <img className={classnames(styles.redLander, styles.lander)} src={redLander}/>
          </div>
        </div>

        <div className={styles.blueHWrapper}>
          <div className={styles.blueVWrapper}>
            <div className={classnames(styles.landerWrapper, styles.blueLander)}>
              <img className={styles.lander} src={blueLander}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
