import * as React from 'react'

import styles from './animation.module.css'
import animationBackground from './graphics/animation-background.png'
import redLander from './graphics/red-lander.png'
import blueLander from './graphics/blue-lander.png'
import classnames from 'classnames'
import play from '../../sounds'

type Props = {
  winner: 'red' | 'blue' | 'tie'
}

export default class MatchResultsAnimation extends React.Component<Props> {
  componentDidMount() {
    window.setTimeout(() => play('announceScores'), 800)
  }

  render() {
    return (
      <div className={styles.wrapper} style={{
        '--red-duration': this.props.winner !== 'blue' ? '2s' : '3.5s',
        '--blue-duration': this.props.winner !== 'red' ? '2s' : '3.5s'
      } as React.CSSProperties}>
        <div className={styles.background} style={{backgroundImage: `url(${animationBackground})`}} />
        <div className={styles.redHWrapper}>
          <div className={styles.redVWrapper}>

            <img className={classnames(styles.redLander, styles.lander)} src={redLander} alt={"red lander"}/>
          </div>
        </div>

        <div className={styles.blueHWrapper}>
          <div className={styles.blueVWrapper}>
            <div className={classnames(styles.landerWrapper, styles.blueLander)}>

              <img className={styles.lander} src={blueLander} alt={"blue lander"}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
