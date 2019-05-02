import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import ScrollingText from '../scrollingText'
import Text from '../text'
import Pill from '../../layout/pill'

export default class AllianceBar extends Component {
  static propTypes = {
    isHeader: PropTypes.bool,
    teamCount: PropTypes.number,
    seed: PropTypes.number,
    teams: PropTypes.array,
    record: PropTypes.number
  }

  render() {
    const teams = this.props.teams || Array.from({length: this.props.teamCount },(v,k)=> this.props.isHeader ? (k === 0 ? 'Captain' : 'Pick ' + k) : '\u00a0')

    return (
      <Pill tight background={this.props.isHeader ? [null, null] : this.props.color || 'extraLightGrey'} width="100%">
        <div className={styles.rowWrapper}>
          <Pill extraTight background={!this.props.seed || this.props.isHeader ? [null, null] : 'darkGrey'} width="6vh"><Text size={45}>{this.props.seed || '\u00a0'}</Text></Pill>
          {teams.map((t) =>
            <div className={styles.teamNumber}><Text size={43}>{t || ''}</Text></div>
          )}
          {typeof this.props.record === 'number' ? <Pill extraTight background={'lightGrey'} width="6vh"><Text size={45}>{this.props.record}</Text></Pill> : null}
        </div>
      </Pill>
    )
  }
}
