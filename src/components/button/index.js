import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import ScrollingText from '../scrollingText'
import Text from '../text'

export default class Button extends Component {
  static propTypes = {
    align: PropTypes.string,
    lineHeight: PropTypes.string,
    noScroll: PropTypes.bool,
    onClick: PropTypes.function
  }

  render() {
    const {
      children,
      onClick
    } = this.props

    return (
      <button className={styles.button} onClick={onClick}>
        <Text size={24}>{children}</Text>
      </button>
    )
  }
}
