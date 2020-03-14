import * as React from 'react'

import styles from './styles.module.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import AllianceBar from '../../components/allianceBar'
import classnames from 'classnames'
import {BaseProps} from "../../baseProps";

type Team = {
  data: {
    number: string
  },
}

type Alliance = {
  team1: Team,
  team2: Team,
  team3: Team,
  seed: number
}

type Stage = {
  red?: Alliance,
  blue?: Alliance,
  redSeed: number,
  blueSeed: number
  redWins: number,
  blueWins: number
}

type Props = BaseProps & {
  sf1: Stage,
  sf2: Stage,
  finals: Stage,
  winner?: Alliance
}

export default class EliminationLadder extends React.Component<Props> {

  renderHeading() {
    return <Heading size={70} align='center'>Elimination Ladder</Heading>
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  allianceToTeams(alliance : Alliance) {
    return Object.keys(alliance).filter((k) => k.match(/^team[0-9]$/) && alliance[k]).map((k) => alliance[k].data.number)
  }

  renderStage(data : Stage) {
    let redTeams : string[] | undefined = undefined;
    let blueTeams : string[] | undefined = undefined;
    if (data) {
      redTeams = data.red && this.allianceToTeams(data.red);
      blueTeams = data.blue && this.allianceToTeams(data.blue);
    }

    return [
      <AllianceBar teams={redTeams} seed={data && data.redSeed} color={'red'} teamCount={4} key={'red'} record={data ? data.redWins : undefined} />,
      <AllianceBar teams={blueTeams} seed={data && data.blueSeed} color={'blue'} teamCount={4} key={'blue'} record={data ? data.blueWins : undefined} />
    ]
  }

  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.wrapper}>
          <div className={classnames(styles.phase, styles.semiFinal, styles.semiFinal1)}>
            {this.renderStage(this.props.sf1)}
          </div>
          <svg viewBox='0 0 18 25' style={{height: '25vh', width: '10vw'}} className={styles.leftArrow}>
            <marker id='triangle' viewBox='0 0 18 18'
              refX='1' refY='5'
              markerUnits='strokeWidth'
              markerWidth='5' markerHeight='5'
              orient='auto'>
              <path d='M 0 0 L 10 5 L 0 10 z' fill='#F7F6F6' />
            </marker>
            <path d='m 5 23 v -13 a 5 5 0 0 1 5 -5 h 1' fill='none' stroke='#F7F6F6' strokeWidth='1' markerEnd='url(#triangle)' />
          </svg>
          <div className={classnames(styles.phase, styles.semiFinal, styles.semiFinal2)}>
            {this.renderStage(this.props.sf2)}
          </div>
          <svg viewBox='0 0 18 25' style={{height: '25vh', width: '10vw'}} className={styles.rightArrow}>
            <marker id='triangle' viewBox='0 0 18 18'
              refX='1' refY='5'
              markerUnits='strokeWidth'
              markerWidth='5' markerHeight='5'
              orient='auto'>
              <path d='M 0 0 L 10 5 L 0 10 z' fill='#F7F6F6' />
            </marker>
            <path d='m 13 13 v -3 a 5 5 0 0 0 -5 -5 h -1' fill='none' stroke='#F7F6F6' strokeWidth='1' markerEnd='url(#triangle)' />
          </svg>
          <div className={classnames(styles.phase, styles.final)}>
            {this.renderStage(this.props.finals)}
          </div>
          <svg viewBox='0 0 18 25' style={{height: '25vh', width: '10vw'}} className={styles.upArrow}>
            <marker id='triangle' viewBox='0 0 18 18'
              refX='1' refY='5'
              markerUnits='strokeWidth'
              markerWidth='5' markerHeight='5'
              orient='auto'>
              <path d='M 0 0 L 10 5 L 0 10 z' fill='#F7F6F6' />
            </marker>
            <path d='m 9 13 v -3' fill='none' stroke='#F7F6F6' strokeWidth='1' markerEnd='url(#triangle)' />
          </svg>
          <div className={styles.winner}>
            <AllianceBar teams={this.props.winner ? this.allianceToTeams(this.props.winner) : undefined} seed={this.props.winner && this.props.winner.seed} teamCount={4} />
          </div>
        </div>
      </PrimaryLayout>
    )
  }
}
