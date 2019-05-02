import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import Panel from '../../layout/panel'
import Pill from '../../layout/pill'
import ScrollingTable from '../../components/scrollingTable'
import AllianceBar from '../../components/allianceBar'

export default class AllianceSelection extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    rankings: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
      rp: PropTypes.number,
      tbp: PropTypes.number,
      matchesPlayed: PropTypes.number
    })),
    queueList: PropTypes.arrayOf(PropTypes.number),
    matchList: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.string,
      redScore: PropTypes.number,
      blueScore: PropTypes.number,
    })),
    matchesPerTeam: PropTypes.number,
    matchesPlayed: PropTypes.number,
    matchCount: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  renderHeading() {
    return <Heading size={70} align='center'>Alliance Selection</Heading>
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  chunkedTeams() {
    return (this.props.state.availableTeams || []).reduce((resultArray, item, index) => {
      // 12 per chunk
      const chunkIndex = Math.floor(index/ 12)

      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])
  }

  render() {
    const alliances = this.props.state.alliances || [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]

    const chunkedTeams = this.chunkedTeams()
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.tableWrapper} style={{margin: '0 2vw'}}>
          <AllianceBar isHeader teamCount={4}/>
          {alliances.map((val, idx) => <div style={{flex: 1}}><AllianceBar seed={idx + 1} teams={val.map((t) => t ? t.number : null)} /></div>)}
        </div>
        <div className={styles.tableWrapper} style={{margin: '0 2vw'}}>
            <table>
              <thead>
                <tr>
                  {chunkedTeams.map(() => [
                    <th key={1} style={{minWidth: '4em'}}><Text size={30}>Team</Text></th>,
                    <th key={2} style={{minWidth: '5em'}}><Text size={30}>Rank</Text></th>
                  ])}
                </tr>
              </thead>
              <tbody>
                {Array.from({length: Math.min(12) },(v,k)=> <tr>
                  {chunkedTeams.map((col) => {
                    const team = col[k];
                    if(!team) return null;
                    const disabled = team.selected || team.removed;
                    return [
                      <td key={1} className={disabled ? styles.disabled : null}><Text size={30}>{team.rank}</Text></td>,
                      <td key={2} className={disabled ? styles.disabled : null}><Text size={30}>{team.number}</Text></td>
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
