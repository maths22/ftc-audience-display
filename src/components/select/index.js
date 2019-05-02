import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import ScrollingText from '../scrollingText'
import Text from '../text'
import shortid from 'short-id'

export default class Select extends Component {
  static propTypes = {
    align: PropTypes.string,
    lineHeight: PropTypes.string,
    noScroll: PropTypes.bool,
    value: PropTypes.object,
    width: PropTypes.string,
    onClick: PropTypes.function
  }

  render() {
    const {
      children,
      onChange,
      value,
      width,
      disabled,
      label
    } = this.props

    const id = shortid.generate();
    const labelAttr = <label htmlFor={id}><Text size={24}>{label}</Text></label>;
    return (
      <div className={styles.inputWrapper}>
        {label ? labelAttr : null}
        <select id={id} className={styles.select} disabled={disabled} onChange={onChange} value={value} style={{width: width}}>
          {children}
        </select>
      </div>
    )
  }
}
