import * as React from 'react'

import styles from './styles.module.css'

import Input from '../../components/input'

type Props = {
  value: string,
  disabled?: boolean,
  onChange: (evt : string) => void,
}

export default class ColorPicker extends React.Component<Props> {
  render() {
    return <div className={styles.colors}>
      {/* TODO consider using color input type here */}
      <Input width='7vw' height='5vh' disabled={this.props.disabled} value={this.props.value} onChange={(evt) => this.props.onChange(evt.currentTarget.value)} />
      <div className={styles.colorSample} style={{background: this.props.value}} />
    </div>
  }
}
