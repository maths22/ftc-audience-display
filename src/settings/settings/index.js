import React, { Component } from 'react'

import styles from './styles.css'

import Input from '../../components/input'
import Panel from '../../layout/panel'
import Heading from '../../components/heading'
import ColorPicker from '../colorPicker'
import Select from '../../components/select'
import SoundTest from '../soundTest'
import Text from '../../components/text'

export const defaultSettings = {
  type: 'audience', // Options: audience, field, pit, sponsor?
  overlay: false,
  overlayColor: '#00ff00',
  field: 1,
  liveScoring: true,
  mute: false,
  overlayFlip: false
}

export default class Settings extends Component {
  constructor(props) {
    super(props)
  }

  setSetting(name) {
    return (val) => this.props.updateSettings(Object.assign({}, this.props.settings, {[name]: val}))
  }

  render() {
    return <div className={styles.settings}>

      <Text size={36}>Sound Test</Text>
      <SoundTest />

      <hr />
      <Text size={36}>Display Settings</Text>

      <Select
        type='select'
        value={this.props.settings.type}
        onChange={(evt) => this.setSetting('type')(evt.target.value)}
        label={'Display Type'}
      >
        <option value='audience'>Audience</option>
        <option value='field'>Field</option>
        <option value='pit'>Pit</option>
        <option value='sponsor'>Sponsor</option>
      </Select>

      {/*TODO make dynamic*/}
      <Select
        value={this.props.settings.field}
        disabled={this.props.settings.type !== 'field'}
        onChange={(evt) => this.setSetting('field')(evt.target.value)}
        label={'Field'}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='all'>All</option>
      </Select>

      <Input
        type='checkbox'
        checked={this.props.settings.liveScoring}
        onChange={(evt) => this.setSetting('liveScoring')(evt.target.checked)}
        label={'Show Live Scores'}
      />

      <Input
        type='checkbox'
        checked={this.props.settings.mute}
        onChange={(evt) => this.setSetting('mute')(evt.target.checked)}
        label={'Mute'}
      />

      <Input
        type='checkbox'
        checked={this.props.settings.overlay}
        onChange={(evt) => this.setSetting('overlay')(evt.target.checked)}
        label={'Use Overlay'}
      />

      <ColorPicker value={this.props.settings.overlayColor}
        disabled={!this.props.settings.overlay}
        onChange={this.setSetting('overlayColor')} />

      <Input
        type='checkbox'
        checked={this.props.settings.overlayFlip}
        onChange={(evt) => this.setSetting('overlayFlip')(evt.target.checked)}
        label={'Show overlay on top (flipped)'}
      />
    </div>
  }
}
