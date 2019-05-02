import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import ScrollingText from '../scrollingText'
import Text from '../text'

export default class Die extends Component {
  static propTypes = {
    number: PropTypes.number,
  }

  renderCenterPip() {
    return <div className={styles.pip} style={{position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, marginTop: 'auto', marginBottom: 'auto', top: 0, bottom: 0 }}/>
  }

  renderCenterLeftPip() {
    return <div className={styles.pip} style={{position: 'absolute', left: '3em', marginTop: 'auto', marginBottom: 'auto', top: 0, bottom: 0 }}/>
  }

  renderCenterRightPip() {
    return <div className={styles.pip} style={{position: 'absolute', right: '3em', marginTop: 'auto', marginBottom: 'auto', top: 0, bottom: 0 }}/>
  }

  renderUpperRightPip(isSix) {
    return <div className={styles.pip} style={{ position: 'absolute', right: isSix ? '3em' : '2em', top: '2em' }}/>
  }

  renderUpperLeftPip(isSix) {
    return <div className={styles.pip} style={{ position: 'absolute', left: isSix ? '3em' : '2em', top: '2em' }}/>
  }

  renderBottomRightPip(isSix) {
    return <div className={styles.pip} style={{ position: 'absolute', right: isSix ? '3em' : '2em', bottom: '2em' }}/>
  }

  renderBottomLeftPip(isSix) {
    return <div className={styles.pip} style={{ position: 'absolute', left: isSix ? '3em' : '2em', bottom: '2em' }}/>
  }

  render() {
    const {
      children,
      onClick
    } = this.props

    return (
      <div className={styles.die} style={{position: 'relative'}}>
        {[1, 3, 5].includes(this.props.number) ? this.renderCenterPip() : null}
        {[2, 3, 4, 5, 6].includes(this.props.number) ? this.renderUpperRightPip(6 === this.props.number) : null}
        {[4, 5, 6].includes(this.props.number) ? this.renderUpperLeftPip(6 === this.props.number) : null}
        {[4, 5, 6].includes(this.props.number) ? this.renderBottomRightPip(6 === this.props.number) : null}
        {[2, 3, 4, 5, 6].includes(this.props.number) ? this.renderBottomLeftPip(6 === this.props.number) : null}
        {[6].includes(this.props.number) ? this.renderCenterLeftPip() : null}
        {[6].includes(this.props.number) ? this.renderCenterRightPip() : null}
      </div>
    )
  }
}
