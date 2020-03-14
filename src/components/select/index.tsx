import * as React from 'react'

import styles from './styles.module.css'
import Text from '../text'
import * as shortid from 'shortid'

type Props = {
  value: any,
  width?: string,
  onChange: (evt: React.FormEvent<HTMLSelectElement>) => void,
  disabled?: boolean,
  label?: string
}

export default class Select extends React.Component<Props> {
  render() {
    const {
      children,
      onChange,
      value,
      width,
      disabled,
      label
    } = this.props;

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
