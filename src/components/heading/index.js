import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import ScrollingText from '../scrollingText'

export default class Heading extends Component {
  static propTypes = {
    size: PropTypes.number,
    align: PropTypes.string,
  }

  render() {
    const {
      size,
      align,
      width,
      children
    } = this.props

    return (
      <span className={styles.heading} style={{fontSize: `${size / 1080 * 90}vh`, textAlign: align}}>
        <ScrollingText width={width || '100%'} text={children}></ScrollingText>
      </span>
    )
  }
}
