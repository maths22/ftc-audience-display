import React, { Component } from 'react'

import styles from './styles.css'

import Input from '../../components/input'
import Panel from '../../layout/panel'

export default class ColorPicker extends Component {

  render() {
    return <div className={styles.colors}>
      {/*TODO consider using color input type here*/}
      <Input width="7vw" height="5vh" disabled={this.props.disabled} value={this.props.value} onChange={(evt) => this.props.onChange(evt.target.value)} />
      <div className={styles.colorSample} style={{background: this.props.value}} />
    </div>
  }
}
