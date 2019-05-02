import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import Panel from '../../layout/panel'
import Pill from '../../layout/pill'
import MatchResultsAnimation from './animation'

export default class MatchResults extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    matchName: PropTypes.string,
    blueRecord: PropTypes.number,
    blueWonSeries: PropTypes.bool,
    redRecord: PropTypes.number,
    redWonSeries: PropTypes.bool,
    blueSeed: PropTypes.number,
    redSeed: PropTypes.number,
    blueAlliance: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
      ranking: PropTypes.number,
      rankMove: PropTypes.number
    })),
    redAlliance: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
      ranking: PropTypes.number,
      rankMove: PropTypes.number
    })),
    winner: PropTypes.string,
    redHighScore: PropTypes.bool,
    redScore: PropTypes.number,
    blueHighScore: PropTypes.bool,
    blueScore: PropTypes.number,
    redScoreBreakdown: PropTypes.arrayOf(PropTypes.array),
    blueScoreBreakdown:PropTypes.arrayOf(PropTypes.array),
  }

  state = { showAnimation: false }

  renderRecordPanel(myRecord, otherRecord, color, seriesWon) {
    if(!myRecord) return;

    const isVictor = myRecord > otherRecord;

    return <Panel border={false} background={isVictor ? color.toLowerCase() : 'lightGrey'}>
      <Text size={40}>
        {seriesWon ? (color + ' wins ') : (isVictor ? (color + ' leads ') : (myRecord === otherRecord ? 'Series tied ' :(color + ' trails ') ))}
        {myRecord} - {otherRecord}
      </Text>
    </Panel>
  }

  renderHeading() {
    return [
      this.renderRecordPanel(this.props.blueRecord, this.props.redRecord, 'Blue', this.props.blueWonSeries),
      <Heading size={70} key={'text'} align='center'>{this.props.matchName}</Heading>,
      this.renderRecordPanel(this.props.redRecord, this.props.blueRecord, 'Red', this.props.redWonSeries),
    ]
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  renderAlliance(alliance, color) {
    return alliance.map((t) => <Panel tight key={t.number} border={false} flex={'horizontal'} background={color} flexAlign='center'>
      <Text size={40}>{t.number.toString()}</Text>
      <span style={{flex: 1, margin: '0 1vw', minWidth: '0px'}}><Text size={30}>{t.name}</Text></span>
      {t.rankMove ? <Text size={35}>{t.rankMove === 'up' ? '▲' : '▼'}</Text> : null}
      {t.ranking ? <Text size={45}>{t.ranking.toString()}</Text> : null}
    </Panel>)
  }
  // autoParking: 0
  // claimedDepot: 0
  // depotMinerals: 0
  // depotPlatinumMinerals: 0
  // endParking: 0
  // landed: 0
  // landerAny: 0
  // landerGold: 0
  // landerPlatinum: 0
  // landerSilver: 0
  // latchedLander: 0
  // majorPenalties: 0
  // mineralSample: 0
  // minorPenalties: 0
  // totalPenaltyPoints: 0
  // totalScore: 0

  calculateRoverRuckusBreakdown(color, br, otherBr) {
    console.log(br)
    return [
      ['Autonomous', br.autoParking + br.claimedDepot + br.landed + br.mineralSample],
      ['Minerals', br.depotMinerals + br.depotPlatinumMinerals + br.landerAny + br.landerGold + br.landerPlatinum + br.landerSilver],
      ['Endgame', br.endParking + br.latchedLander],
      [(color === 'Red' ? 'Blue' : 'Red') + ' Penalty', otherBr.totalPenaltyPoints],
    ]
  }

  renderAllianceResult(score, rrBreakdown, color, {isWin, isHighscore, scoreFirst, otherBreakdown}) {
    const breakdown = this.calculateRoverRuckusBreakdown(color, rrBreakdown, otherBreakdown)
    const winElem = isWin ? <Pill background={color.toLowerCase()}><Text size={40}>{color} Wins!</Text></Pill> : <span style={{width: '10em'}}></span>
    const table = <table style={{textAlign: scoreFirst ? 'left' : 'right', marginBottom: '1vh'}}>
      <tbody>
      {breakdown.map((row) => {
        return <tr>
          {scoreFirst ? null : <td><Text size={35}>{row[0]}</Text></td>}
          <td><Text size={35}>{row[1]}</Text></td>
          {scoreFirst ? <td><Text size={35}>{row[0]}</Text></td> : null}
        </tr>
      })}
      </tbody>
    </table>
    return <div style={{margin: 'auto 1.3vw 0 1.3vw'}}>

      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        {scoreFirst ? null : winElem}
        {scoreFirst ? table : null}
        <Pill tight width='18vh' border={false} background={color.toLowerCase()} height='12vh'
              customStyles={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Text size={80} lineHeight="1em">{score.toString()}</Text>
          <Text size={30}>{isHighscore ? 'High Score!' : null}</Text>
        </Pill>
        {scoreFirst ? null : table}
        {scoreFirst ? winElem : null}
      </div>
    </div>
  }

  componentDidMount() {
    this.showAnimation()
  }

  componentDidUpdate(prevProps) {
    if(this.props.matchName != prevProps.matchName) {
      this.showAnimation()
    }
  }

  showAnimation() {
    this.setState({showAnimation: true})
    window.setTimeout(() => this.setState({showAnimation: false}), 2500)
  }

  render() {
    if(this.state.showAnimation) {
      // return <MatchResultsAnimation {...this.props} />
    }
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div style={{flex: '0 50%', minWidth: '0', paddingTop: '1vh', display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
          <div style={{margin: '0 1.3vw', display: 'flex', alignItems: 'center'}}>
            {this.props.blueSeed ? <Pill tight background='blue' width='3em'><Text size={40}>{this.props.blueSeed}</Text></Pill> : null}
            <Heading size={50} align='center'>Blue Alliance</Heading>
          </div>
          <div>
            {this.renderAlliance(this.props.blueAlliance, 'blue')}
          </div>
          {this.renderAllianceResult(this.props.blueScore, this.props.blueScoreBreakdown, 'Blue',
            {isHighscore: this.props.blueHighScore, scoreFirst: false, isWin: this.props.winner == 'blue', otherBreakdown: this.props.redScoreBreakdown})}
        </div>
        <div style={{flex: '0 50%', minWidth: '0', paddingTop: '1vh', display: 'flex', flexDirection: 'column'}}>
          <div style={{margin: '0 1.3vw', display: 'flex', alignItems: 'center'}}>
            <Heading size={50} align='center'>Red Alliance</Heading>
            {this.props.redSeed ? <Pill tight background='red' width='3em'><Text size={40}>{this.props.redSeed}</Text></Pill> : null}
          </div>
          <div>
            {this.renderAlliance(this.props.redAlliance, 'red')}
          </div>
          {this.renderAllianceResult(this.props.redScore, this.props.redScoreBreakdown, 'Red',
            {isHighscore: this.props.redHighScore, scoreFirst: true, isWin: this.props.winner == 'red', otherBreakdown: this.props.blueScoreBreakdown})}

        </div>
      </PrimaryLayout>
    )
  }
}
