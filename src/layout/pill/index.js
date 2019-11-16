import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import classnames from 'classnames'

export default class Pill extends Component {
  static propTypes = {
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    tight: PropTypes.bool,
    extraTight: PropTypes.bool,
  }

  render() {
    const {
      width,
      height,
      children,
      extraTight,
      tight,
      background,
      customStyles
    } = this.props


    const colors = Array.isArray(background) ? background : {
      darkGrey: ['#606060BF', '#F7F6F6'],
      lightGrey: ['#BBBBBB', '#232323'],
      extraLightGrey: ['#f7f6f6', '#232323'],
      red: ['#FF5555', '#F7F6F6'],
      blue: ['#3264FF', '#F7F6F6'],
    }[background]

    return (
      <div className={classnames(styles.pill, tight ? styles.pillTightEdges : (extraTight ? styles.pillExtraTightEdges : styles.pillEdges))}
        style={{
          width: width,
          height: height,
          background: colors[0],
          color: colors[1],
          ...customStyles
        }}>
        {children}
      </div>
    )
  }
}
