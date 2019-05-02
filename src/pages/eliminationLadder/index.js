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
import classnames from 'classnames'

export default class EliminationLadder extends Component {
  static propTypes = {
    eventName: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  renderHeading() {
    return <Heading size={70} align='center'>Elimination Ladder</Heading>
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  allianceToTeams(alliance) {
    return Object.keys(alliance).filter((k) => k.match(/^team[0-9]$/)).map((k) => alliance[k].data.number)
  }

  renderStage(data) {
    let redTeams = null;
    let blueTeams = null;
    if(data) {
      redTeams = data.red && this.allianceToTeams(data.red)
      blueTeams = data.blue && this.allianceToTeams(data.blue)
    }
    console.log(data)

    return [
      <AllianceBar teams={redTeams} seed={data && data.redSeed} color={'red'} teamCount={4} key={'red'} record={data ? data.redWins : null}/>,
      <AllianceBar teams={blueTeams} seed={data && data.blueSeed} color={'blue'} teamCount={4} key={'blue'} record={data ? data.blueWins : null}/>
    ]
  }

  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.wrapper}>
          <div className={classnames(styles.phase, styles.semiFinal, styles.semiFinal1)}>
            {this.renderStage(this.props.sf1)}
          </div>
          <svg viewBox="0 0 18 25" style={{height: '25vh', width: '10vw'}} className={styles.leftArrow}>
            <marker id="triangle" viewBox="0 0 18 18"
                    refX="1" refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="5" markerHeight="5"
                    orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#F7F6F6"/>
            </marker>
            <path d="m 5 23 v -13 a 5 5 0 0 1 5 -5 h 1" fill="none" stroke="#F7F6F6" strokeWidth="1" markerEnd="url(#triangle)" />
          </svg>
          <div className={classnames(styles.phase, styles.semiFinal, styles.semiFinal2)}>
            {this.renderStage(this.props.sf2)}
          </div>
          <svg viewBox="0 0 18 25" style={{height: '25vh', width: '10vw'}} className={styles.rightArrow}>
            <marker id="triangle" viewBox="0 0 18 18"
                    refX="1" refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="5" markerHeight="5"
                    orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#F7F6F6"/>
            </marker>
            <path d="m 13 13 v -3 a 5 5 0 0 0 -5 -5 h -1" fill="none" stroke="#F7F6F6" strokeWidth="1" markerEnd="url(#triangle)" />
          </svg>
          <div className={classnames(styles.phase, styles.final)}>
            {this.renderStage(this.props.finals)}
          </div>
          <svg viewBox="0 0 18 25" style={{height: '25vh', width: '10vw'}} className={styles.upArrow}>
            <marker id="triangle" viewBox="0 0 18 18"
                    refX="1" refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="5" markerHeight="5"
                    orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#F7F6F6"/>
            </marker>
            <path d="m 9 13 v -3" fill="none" stroke="#F7F6F6" stroke-width="1" marker-end="url(#triangle)" />
          </svg>
          <div className={styles.winner}>
            <AllianceBar teams={this.props.winner ? this.allianceToTeams(this.props.winner) : null} seed={this.props.winner && this.props.winner.seed} teamCount={4}/>
          </div>
        </div>
      </PrimaryLayout>
    )
  }
}
