import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import ScrollingText from '../scrollingText'

export default class Text extends Component {
  static propTypes = {
    size: PropTypes.number,
    align: PropTypes.string,
    lineHeight: PropTypes.string,
    noScroll: PropTypes.bool
  }

  render() {
    const {
      size,
      align,
      width,
      outerWidth,
      lineHeight,
      children,
      noScroll
    } = this.props

    return (
      <span className={styles.text} style={{fontSize: `${size / 1080 * 90}vh`, textAlign: align, lineHeight: lineHeight, width: outerWidth}}>
        {noScroll ? children : <ScrollingText width={width || '100%'} text={children} />}
      </span>
    )
  }
}
