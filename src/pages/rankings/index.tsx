import * as React from 'react'
import {PersistentWebsocket} from 'persistent-websocket'

import styles from './styles.module.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import ScrollingTable from '../../components/scrollingTable'
import { BaseProps } from '../../baseProps';

type State = {
  rankings?: Array<{
    rank: number,
    number: number,
    name?: string,
    rp: number,
    tbp: number,
    matchesPlayed: number
  }>,
  queueList?: Array<number>,
  matchList?: Array<{
    number: string,
    redScore: number,
    blueScore: number
  }>,
  matchesPerTeam?: number,
  matchCount?: number,
  matchesPlayed?: number
}

type Props =  BaseProps & State

export default class Rankings extends React.Component<Props, State> {
  private pws: PersistentWebSocket;
  constructor(props : Props) {
    super(props);
    this.state = {}
  }

  renderHeading() {
    return <Heading size={70} key={'text'} align='center'>{this.props.eventName} Rankings</Heading>
  }

  componentDidMount() {
    this.listenSse()
  }

  componentWillUnmount() {
    this.unlistenSse()
  }

  listenSse() {
    this.pws = new PersistentWebsocket(this.props.pitUpdateUrl);

    this.pws.onmessage = (e) => {
      const obj = JSON.parse(e.data);
      if (obj.type === 'RANKINGS') {
        this.setState({rankings: obj.payload.sort((a: ApiRanking, b: ApiRanking) => Math.abs(a.ranking) - Math.abs(b.ranking)).map((res: ApiRanking) => ({
          rank: res.ranking > 0 ? res.ranking : 'NP',
          number: res.team,
          name: res.teamName,
          rp: res.RP,
          tbp: res.TBP,
          matchesPlayed: res.plays
        }))})
      } else if (obj.type === 'RESULT') {
        const results = obj.payload.filter((m : ApiMatch) => m.played).map((m : ApiMatch) => ({
          number: m.match,
          redScore: m.red,
          blueScore: m.blue
        }));
        this.setState({matchList: results, matchCount: obj.payload.length, matchesPlayed: results.length})
      }
      const matchesPerTeam = this.state.rankings && this.state.matchCount ? Math.floor((this.state.matchCount * this.props.teamsPerAlliance * 2) / this.state.rankings.length) : 0;
      this.setState({matchesPerTeam})
    };
    this.pws.open()
  }

  unlistenSse() {
    if (this.pws) {
      this.pws.close()
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
        <Text size={38} align='right'>{matchCount! > 0 ? (matchesPlayed || 0) + ' / ' + matchCount + ' matches played' : ''}</Text>
        <Text size={38} align='right'>{matchesPerTeam! > 0 ? matchesPerTeam + ' matches/team' : ''}</Text>
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
                color: (isRedWin ? ['#FF5555', '#F7F6F6'] : (isBlueWin ? ['#3264FF', '#F7F6F6'] : null))
              })
            })}
          />
        </div>
      </PrimaryLayout>
    )
  }
}
