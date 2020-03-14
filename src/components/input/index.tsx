import * as React from 'react'
import * as shortid from 'shortid'

import styles from './styles.module.css'
import Text from '../text'

type Props = {
  onChange: (evt : React.FormEvent<HTMLInputElement>) => void,
  value?: any,
  checked?: boolean,
  width?: string,
  type?: string,
  height?: string,
  disabled?: boolean,
  label?: string
}

export default class Input extends React.Component<Props> {

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
    } = this.props;

    const id = shortid.generate();
    const labelAttr = <label htmlFor={id}><Text size={24}>{label}</Text></label>;
    return <div className={styles.inputWrapper}>
      {type === 'checkbox' || !label ? null : labelAttr}
      <input id={id} className={styles.input} type={type} disabled={disabled} onChange={onChange} checked={checked} value={value} style={{width: width, height: height}} />
      {type === 'checkbox' && label ? labelAttr : null}
    </div>
  }
}
