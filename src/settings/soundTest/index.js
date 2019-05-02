import React, { Component } from 'react'

import styles from './styles.css'

import play, { sounds } from '../../sounds'
import Button from '../../components/button'
import Select from '../../components/select'

export default class SoundTest extends Component {
  constructor(props) {
    super(props)
    this.state = {selectedSound: Object.keys(sounds)[0]}
  }

  render() {
    return <div className={styles.sounds}>
      <Select width="12vw" value={this.state.selectedSound} onChange={(evt) => this.setState({selectedSound: evt.target.value})}>
        {Object.keys(sounds).map((k) => <option value={k} key={k}>{k}</option> ) }
      </Select>
      <Button onClick={() => play(this.state.selectedSound)}>Play</Button>
    </div>
  }
}
