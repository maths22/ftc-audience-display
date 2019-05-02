import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Background from '../background'
import Panel from '../panel'

import styles from './styles.css'

import 'typeface-allerta'
import FtcLogo from './ftc-logo.png'
import SeasonLogo from './season-logo.png'
import SettingsDialog from '../../settings/settingsDialog'

export default class OverlayLayout extends Component {
  render() {
    const {
      heading,
      children,
      flip,
      footer,
      bodyFlex
    } = this.props

    return [
      <Background key={0}/>,
      <div className={classnames(styles.keyRegion, flip ? styles.flip: null)} key={'key'}/>,
      <div className={classnames(styles.main, flip ? styles.flip: null)} key={1}>
        <div className={styles.separatorBar} style={{position: 'absolute', left: 0, [flip ? 'bottom' : 'top']: 0, display: 'inline-flex', alignItems: 'center', width: '50%', borderRightWidth: '0.05vw'}}>
          <img src={FtcLogo} style={{height: 'calc(100% - 1vmin)', margin: '0.5vmin'}} />
          <div className={styles.centeredContainer}>
            {heading}
          </div>
        </div>
        <div className={styles.separatorBar} style={{position: 'absolute', left: '50%', [flip ? 'bottom' : 'top']: 0, display: 'inline-flex', alignItems: 'center', width: '50%', borderLeftWidth: '0.05vw'}}>
          <div className={styles.centeredContainer}>
            {footer}
          </div>
          <img src={SeasonLogo} style={{height: 'calc(100% - 1vmin)', margin: '0.5vmin', marginLeft: 'auto'}}/>
        </div>
        <div style={{display: 'flex', flexDirection: 'horizontal', position: 'relative', 'top': flip ? null : '5.5vh'}}>
          {children}
        </div>
      </div>
    ]
  }
}
