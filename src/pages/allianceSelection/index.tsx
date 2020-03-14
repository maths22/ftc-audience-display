import * as React from 'react'

import styles from './styles.module.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import AllianceBar from '../../components/allianceBar'
import {BaseProps} from "../../baseProps";

type SelectionTeam = {
  rank: number,
  number: string,
  selected: boolean,
  removed: boolean
}

type SelectionState = {
  availableTeams: SelectionTeam[],
  alliances?: SelectionTeam[][]
}

type Props = BaseProps & {
  state: SelectionState
}

export default class AllianceSelection extends React.Component<Props> {
  renderHeading() {
    return <Heading size={70} align='center'>Alliance Selection</Heading>
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  chunkedTeams() {
    return (this.props.state.availableTeams || []).reduce<SelectionTeam[][]>((resultArray, item, index) => {
      // 12 per chunk
      const chunkIndex = Math.floor(index / 12);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray
    }, [])
  }

  render() {
    const alliances : (SelectionTeam | null)[][] = this.props.state.alliances || [[null, null, null], [null, null, null], [null, null, null], [null, null, null]];
    const maxNonNullLength = Math.max(...alliances.map((r) => r.filter((x) => x).length));

    const chunkedTeams = this.chunkedTeams();
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.tableWrapper} style={{margin: '0 2vw'}}>
          <AllianceBar isHeader teamCount={Math.max(3, maxNonNullLength)} />
          {alliances.map((val, idx) => <div style={{flex: 1}}><AllianceBar seed={idx + 1} teamCount={Math.max(3, maxNonNullLength)} teams={val.map((t) => t ? t.number : null)} /></div>)}
        </div>
        <div className={styles.tableWrapper} style={{margin: '0 2vw'}}>
          <table>
            <thead>
              <tr>
                {chunkedTeams.map(() => [
                  <th key={1} style={{minWidth: '4em'}}><Text size={30}>Rank</Text></th>,
                  <th key={2} style={{minWidth: '5em'}}><Text size={30}>Team</Text></th>
                ])}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.min(12) }, (_, k) => <tr>
                {chunkedTeams.map((col) => {
                  const team = col[k];
                  if (!team) return null;
                  const disabled = team.selected || team.removed;
                  return [
                    <td key={1} className={disabled ? styles.disabled : undefined}><Text size={30}>{team.rank}</Text></td>,
                    <td key={2} className={disabled ? styles.disabled : undefined}><Text size={30}>{team.number}</Text></td>
                  ]
                })}
              </tr>)}
            </tbody>
          </table>
        </div>
      </PrimaryLayout>
    )
  }
}
