import * as React from 'react'

import styles from './styles.module.css'
import Text from '../text'
import Pill from '../../layout/pill'

type Props = {
  isHeader?: boolean,
  teamCount: number,
  seed?: number,
  teams?: Array<string | null>,
  record?: number,
  color?: 'red' | 'blue'
}

export default class AllianceBar extends React.Component<Props> {

  render() {
    const teams = this.props.teams || Array.from({ length: this.props.teamCount }, (_, k) => this.props.isHeader ? (k === 0 ? 'Captain' : 'Pick ' + k) : '\u00a0');

    const nonNullTeams = teams.filter(t => t);
    const trimmedTeams = nonNullTeams.concat(Array.from({length: this.props.teamCount - nonNullTeams.length}, () => '\u00a0'));

    return (
      <Pill tight background={this.props.isHeader ? [null, null] : this.props.color || 'extraLightGrey'} width='100%'>
        <div className={styles.rowWrapper}>
          <Pill extraTight background={!this.props.seed || this.props.isHeader ? [null, null] : 'darkGrey'} width='6vh'><Text size={45}>{this.props.seed || '\u00a0'}</Text></Pill>
          {trimmedTeams.map((t) =>
            <div className={styles.teamNumber}><Text size={43}>{t || ''}</Text></div>
          )}
          {typeof this.props.record === 'number' ? <Pill extraTight background={'lightGrey'} width='6vh'><Text size={45}>{this.props.record}</Text></Pill> : null}
        </div>
      </Pill>
    )
  }
}
