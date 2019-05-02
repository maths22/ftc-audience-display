import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import classnames from 'classnames'

export default class Panel extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    flex: PropTypes.string,
    flexAlign: PropTypes.string,
    flexJustify: PropTypes.string,
    border: PropTypes.bool,
    tight: PropTypes.bool,
    extraTight: PropTypes.bool,
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    customStyles: PropTypes.object
  }

  static defaultProps = {
    border: true,
    background: 'darkGrey',
  }

  static get marginHeight() {
    return 2.5
  }

  render() {
    const {
      height,
      width,
      flex,
      flexAlign,
      flexJustify,
      border,
      tight,
      extraTight,
      children,
      customStyles,
      background
    } = this.props

    if (width < 4 || height < 4) {
      return null
    }

    const flexClasses = {
      'horizontal': styles.horizontalFlex,
      'vertical': styles.verticalFlex
    }

    const flexClass = flexClasses[flex]

    const colors = Array.isArray(background) ? background : {
      darkGrey: ['#606060BF', '#F7F6F6'],
      lightGrey: ['#BBBBBB', '#232323'],
      extraLightGrey: ['#f7f6f6', '#232323'],
      red: ['#FF5555', '#232323'],
      blue: ['#44AAFF', '#232323'],
    }[background]

    return (
      <div className={classnames(styles.panel, flexClass, tight ? styles.tightEdges : (extraTight ? styles.extraTightEdges : styles.edges), border ? styles.border : styles.noBorder)}
        style={{
          width: `${width - (1.3 * 2)}vw`,
          height: `${height - (Panel.marginHeight * 2)}vh`,
          alignItems: flexAlign,
          justifyContent: flexJustify,
          background: colors[0],
          color: colors[1],
          ...customStyles
        }}>
        {children}
      </div>
    )
  }
}
