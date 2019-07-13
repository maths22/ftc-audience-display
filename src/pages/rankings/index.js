import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import Panel from '../../layout/panel'
import Pill from '../../layout/pill'
import ScrollingTable from '../../components/scrollingTable'

export default class Rankings extends Component {
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
    return <Heading size={70} key={'text'} align='center'>{this.props.eventName} Rankings</Heading>
  }

  componentDidMount() {
    this.startUpdater()
  }

  componentWillUnmount() {
    this.stopUpdater()
  }

  startUpdater() {
    this.pullData()
    this.interval = setInterval(() => {
      this.pullData()
    }, 10000)
  }

  stopUpdater() {
    if(this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  pullData = async () => {
    try {
      const result = await fetch(this.props.baseApiUrl + `events/${this.props.eventKey}/rankings/`)
      const data = await result.json()
      this.setState({rankings: data.rankingList.sort((a, b) => Math.abs(a.ranking) - Math.abs(b.ranking)).map((res) => ({
        rank: res.ranking > 0 ? res.ranking : 'NP',
        number: res.team,
        name: res.teamName,
        rp: res.rankingPoints,
        tbp: res.tieBreakerPoints,
        matchesPlayed: res.matchesPlayed
      }))})
    } catch(ex) {
      console.log(ex)
    }
    try {
      const result = await fetch(this.props.baseApiUrl + `events/${this.props.eventKey}/matches/`)
      const data = await result.json()
      const results = await Promise.all(data.matches.filter((m) => m.finished).map(async (m) => {
        const detailResult = await fetch(this.props.baseApiUrl + `events/${this.props.eventKey}/matches/${m.matchNumber}/`)
        const details = await detailResult.json()
        return {
          number: 'Q-' + m.matchNumber,
          redScore: details.redScore,
          blueScore: details.blueScore
        }

      }))
      //6 because we have 3-team alliances
      const matchesPerTeam = this.state.rankings ? Math.floor((data.matches.length * 6) / this.state.rankings.length) : 0;
      this.setState({matchList: results, matchCount: data.matches.length, matchesPlayed: results.length, matchesPerTeam})
    } catch(ex) {
      console.log(ex)
    }
  }

  renderFooter() {
    let {
      queueList,
      matchesPerTeam,
      matchCount,
      matchesPlayed
    } = this.state;
    queueList = queueList || this.props.queueList;
    matchesPerTeam = matchesPerTeam || this.props.matchesPerTeam;
    matchCount = matchCount || this.props.matchCount;
    matchesPlayed = matchesPlayed || this.props.matchesPlayed;
    return [
      <Heading size={70} align='left' key='queue'>{queueList && queueList.length > 0 ? 'Now Queuing: ' + queueList.join(', ') : ''}</Heading>,
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', marginRight: '2vw'}} key={'stats'}>
        <Text size={38} align='right'>{matchCount > 0 ? (matchesPlayed || 0) + ' / ' + matchCount + ' matches played' : ''}</Text>
        <Text size={38} align='right'>{matchesPerTeam > 0 ? matchesPerTeam + ' matches/team' : ''}</Text>
      </div>
    ]
  }

  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.tableWrapper}>
          <ScrollingTable
            width='30vw'
            height='100%'
            keyCol={'number'}
            columns={[
              {
                name: 'Rank',
                field: 'rank'
              },
              {
                name: 'Number',
                field: 'number'
              },
              {
                name: 'RP',
                field: 'rp'
              },
              {
                name: 'TBP',
                field: 'tbp'
              },
              {
                name: 'Plays',
                field: 'matchesPlayed'
              }
            ]}
            data={this.state.rankings || this.props.rankings || []}
          />
        </div>
        <div className={styles.tableWrapper}>
          <ScrollingTable
            width='30vw'
            height='100%'
            keyCol={'number'}
            colorCol={'color'}
            columns={[
              {
                name: 'Match',
                field: 'number',
                width: '50%'
              },
              {
                name: 'Result',
                field: 'result',
                width: '50%'
              }
            ]}
            data={(this.state.matchList || this.props.matchList || []).map((m) => {
              const isRedWin = m.redScore > m.blueScore;
              const isBlueWin = m.blueScore > m.redScore;
              return Object.assign({}, m, {
                result: m.redScore + '-' + m.blueScore + ' ' + (isRedWin ? 'R' : (isBlueWin ? 'B' : 'T')),
                color: (isRedWin ? '#FF5555' : (isBlueWin ? '#44AAFF' : null))
              })
            })}
          />
        </div>
      </PrimaryLayout>
    )
  }
}
