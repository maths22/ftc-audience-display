import * as React from 'react'

import styles from './styles.module.css'

import play, { sounds } from '../../sounds'
import Button from '../../components/button'
import Select from '../../components/select'

type Props = {}
type State = {
  selectedSound: string
}

export default class SoundTest extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);
    this.state = {selectedSound: Object.keys(sounds)[0]}
  }

  render() {
    return <div className={styles.sounds}>
      <Select width='12vw' value={this.state.selectedSound} onChange={(evt) => this.setState({selectedSound: evt.currentTarget.value})}>
        {Object.keys(sounds).map((k) => <option value={k} key={k}>{k}</option>) }
      </Select>
      <Button onClick={() => play(this.state.selectedSound)}>Play</Button>
    </div>
  }
}
