import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'short-id'

import styles from './styles.css'
import ScrollingText from '../scrollingText'
import Text from '../text'

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.object,
    width: PropTypes.string,
    label: PropTypes.string,
  }

  render() {
    const {
      onChange,
      value,
      checked,
      width,
      type,
      height,
      disabled,
      label
    } = this.props

    const id = shortid.generate();
    const labelAttr = <label htmlFor={id}><Text size={24}>{label}</Text></label>
    return <div className={styles.inputWrapper}>
      {type === 'checkbox' || !label ? null : labelAttr}
      <input id={id} className={styles.input} type={type} disabled={disabled} onChange={onChange} checked={checked} value={value} style={{width: width, height: height}} />
      {type === 'checkbox' && label ? labelAttr : null}
    </div>
  }
}
