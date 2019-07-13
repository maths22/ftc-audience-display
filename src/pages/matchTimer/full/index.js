import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../../layout/primary'
import Heading from '../../../components/heading'
import Text from '../../../components/text'
import Panel from '../../../layout/panel'
import Pill from '../../../layout/pill'
import blockPresent from '../graphics/block_present.png'
import ballPresent from '../graphics/ball_present.png'
import blockAbsent from '../graphics/block_absent.png'
import ballAbsent from '../graphics/ball_absent.png'
import blockBall from '../graphics/block_ball.png'
import landerRed from '../graphics/lander_red_small.png'
import landerBlue from '../graphics/lander_blue_small.png'

const periodLabels = {
  'stopped': 'Match not started',
  'auto': 'Autonomous',
  'pickup': 'Pick up Your Controllers',
  'teleop': 'Teleoperated',
  'endgame': 'Endgame',
  'complete': 'Match complete',
  'aborted': 'Match aborted'
}

export default class MatchTimer extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    matchName: PropTypes.string,
    blueSeed: PropTypes.number,
    redSeed: PropTypes.number,
    blueAlliance: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
    })),
    redAlliance: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
    })),
    time: PropTypes.string,
    period: PropTypes.string,
    redScore: PropTypes.number,
    blueScore: PropTypes.number,
    redScoreDetails: PropTypes.arrayOf(PropTypes.array),
    blueScoreDetails:PropTypes.arrayOf(PropTypes.array),
  }

  renderHeading() {
    return <Heading size={70} key={'text'} align='center'>{this.props.matchName}</Heading>;
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  renderAllianceSeed (color, seed, alignEnd) {
    return seed ? <Pill tight width='5vw' flex={'vertical'} border={false} background={color} flexAlign='center' customStyles={{alignSelf: alignEnd ? 'flex-end' : null}}>
      <Text size={35} lineHeight="1em">{seed}</Text>
    </Pill> : null
  }

  renderAlliance(alliance) {
    return <div style={{display: 'flex', flexDirection: 'column', width: '12vh'}}>
      {alliance.map((t) =>
        <Pill tight width='100%' flex={'vertical'} border={false} background={t.cardCarries ? ['#ffff33', '#232323'] : ['#f7f6f6', '#232323']} flexAlign='center'>
          <Text size={35} lineHeight="1em">{t.number}</Text>
        </Pill>)}
    </div>
  }

  renderAllianceResult(score, color) {
    return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
        <Pill width='18vh' flex={'vertical'} border={false} background={color.toLowerCase()} flexAlign='center' customStyles={{alignSelf: 'flex-end'}}>
          <Text size={80} lineHeight="1em">{score.toString()}</Text>
        </Pill>
      </div>
  }

  renderLiveDetails(color) {
    if(this.props.period === 'aborted') return null;
    const score = (color === 'red' ? this.props.redScoreDetails : this.props.blueScoreDetails) || {};
    const autoPeriods = ['stopped', 'auto', 'pickup'];
console.log(this.props.random)
    const random = this.props.random || 1;
    const blockRow = [blockPresent, blockAbsent];
    const ballRow = [ballPresent, ballAbsent];
    const rows = [
      random === 1 || random === 6 ? blockRow : ballRow,
      random === 2 || random === 5 ? blockRow : ballRow,
      random === 3 || random === 4 ? blockRow : ballRow
    ]
    const backLeftSampleFieldState = score.backLeftSampleFieldState !== null ? score.backLeftSampleFieldState : 7;
    const backRightSampleFieldState = score.backRightSampleFieldState !== null ? score.backRightSampleFieldState : 7;
    const frontLeftSampleFieldState = score.frontLeftSampleFieldState !== null ? score.frontLeftSampleFieldState : 7;
    const frontRightSampleFieldState = score.frontRightSampleFieldState !== null ? score.frontRightSampleFieldState : 7;

    return <>
        <Text size={40}>Auto</Text>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div className={styles.scoreRow} style={{flex: 1, padding: '0 1vw'}}>
            <img src={(backLeftSampleFieldState & 4) ? rows[0][0] : rows[0][1]} className={styles.miniImage}/>
            <img src={(backLeftSampleFieldState & 2) ? rows[1][0] : rows[1][1]} className={styles.miniImage}/>
            <img src={(backLeftSampleFieldState & 1) ? rows[2][0] : rows[2][1]} className={styles.miniImage}/>
          </div>
          <div className={styles.scoreRow} style={{flex: 1, padding: '0 1vw'}}>
            <img src={(backRightSampleFieldState & 4) ? rows[0][0] : rows[0][1]} className={styles.miniImage}/>
            <img src={(backRightSampleFieldState & 2) ? rows[1][0] : rows[1][1]} className={styles.miniImage}/>
            <img src={(backRightSampleFieldState & 1) ? rows[2][0] : rows[2][1]} className={styles.miniImage}/>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div className={styles.scoreRow} style={{flex: 1, padding: '0 1vw'}}>
            <img src={(frontLeftSampleFieldState & 4) ? rows[0][0] : rows[0][1]} className={styles.miniImage}/>
            <img src={(frontLeftSampleFieldState & 2) ? rows[1][0] : rows[1][1]} className={styles.miniImage}/>
            <img src={(frontLeftSampleFieldState & 1) ? rows[2][0] : rows[2][1]} className={styles.miniImage}/>
          </div>
          <div className={styles.scoreRow} style={{flex: 1, padding: '0 1vw'}}>
            <img src={(frontRightSampleFieldState& 4) ? rows[0][0] : rows[0][1]} className={styles.miniImage}/>
            <img src={(frontRightSampleFieldState & 2) ? rows[1][0] : rows[1][1]} className={styles.miniImage}/>
            <img src={(frontRightSampleFieldState & 1) ? rows[2][0] : rows[2][1]} className={styles.miniImage}/>
          </div>
        </div>

        <Text size={40}>Teleop</Text>
        <Text size={35}>Depot</Text>

        <div style={{display: 'flex', flexDirection: 'row', width: '25vh'}}>
          <div className={styles.scoreRow} style={{flex: 1}}>
            <div style={{borderStyle: 'solid', borderWidth: '0.5vh', marginRight: '1vw', borderColor: color === 'red' ? '#FF5555' : '#44AAFF', height: '5vh', width: '5vh'}}/>
            <img src={blockBall} className={styles.miniImage}/>
            <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{score.depot || 0}</Text></span>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', width: '25vh'}}>
          <div style={{borderStyle: 'solid', borderWidth: '0.5vh', marginRight: '1vw', borderColor: color === 'red' ? '#FF5555' : '#44AAFF', height: '5vh', width: '5vh'}}/>
          <div className={styles.scoreRow} style={{flex:1, background: color === 'red' ? '#FF5555BB' : '#44AAFFBB', borderRadius: '2vh'}}>
            <img src={blockBall} className={styles.miniImage} />
            <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{score.depotPlatinum || 0}</Text></span>
          </div>
        </div>
        <Text size={35}>Lander</Text>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div className={styles.scoreRow} style={{flex: 1}}>
            <img src={color === 'red' ? landerRed : landerBlue} className={styles.miniImage}/>
            <img src={blockPresent} className={styles.miniImage}/>
            <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{(score.frontGold || 0) + (score.backGold || 0)}</Text></span>
          </div>
          <div className={styles.scoreRow} style={{flex: 1}}>
            <img src={color === 'red' ? landerRed : landerBlue} className={styles.miniImage}/>
            <img src={blockBall} className={styles.miniImage}/>
            <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{(score.any || 0)}</Text></span>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div className={styles.scoreRow} style={{flex: 1}}>
            <img src={color === 'red' ? landerRed : landerBlue} className={styles.miniImage}/>
            <img src={ballPresent} className={styles.miniImage} />
            <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{(score.silver || 0)}</Text></span>
          </div>
          <div className={styles.scoreRow} style={{flex: 1, background: color === 'red' ? '#FF5555BB' : '#44AAFFBB', borderRadius: '2vh'}}>
            <img src={color === 'red' ? landerRed : landerBlue} className={styles.miniImage}/>
            <img src={blockBall} className={styles.miniImage} />
            <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{(score.ownAnyPlatinum || 0) + (score.ownFrontGoldPlatinum || 0) + (score.ownBackGoldPlatinum || 0) + (score.ownSilverPlatinum || 0)
            + (score.theirAnyPlatinum || 0) + (score.theirFrontGoldPlatinum || 0) + (score.theirBackGoldPlatinum || 0) + (score.theirSilverPlatinum || 0)}</Text></span>
          </div>
        </div>
      </>
  }

  renderLive() {
    return <>
      <div style={{flex: '1', minWidth: '0', paddingTop: '1vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        { this.props.showLiveScoring ? this.renderLiveDetails('blue') : null }
      </div>
      <div style={{paddingTop: '1vh', display: 'flex', flexDirection: 'column', alignItems: 'stretch', minWidth: '40vw'}}>
        <Panel extraTight border={false} flex={'horizontal'} background={'extraLightGrey'} flexAlign='center'>
          <Text outerWidth='100%' size={325} lineHeight='1em' align={'center'}>
            {[...this.props.time].map((c, idx) => <span key={idx} style={{width: c == ':' ? '0.25em' : '0.6em', display: 'inline-block', textAlign: 'center'}}>{c}</span>)}
          </Text>
        </Panel>

        <Panel extraTight border={false} flex={'horizontal'} background={'lightGrey'} flexAlign='center'>
          <Text outerWidth='100%' size={35} lineHeight='1em' align={'center'}>{periodLabels[this.props.period]}</Text>
        </Panel>

        <div style={{paddingTop: '0.5vh', display: 'flex', flexDirection: 'row', alignItems: 'stretch', margin: '0 1vw'}}>
          {this.renderAlliance(this.props.blueAlliance)}

          <div style={{margin: '0 1.3vw 0 1.3vw', flex: '1'}} className={styles.scoreWrapper}>
            {this.renderAllianceSeed( 'blue', this.props.blueSeed)}
            {this.props.showLiveScoring ? this.renderAllianceResult(this.props.blueScore, 'Blue', this.props.blueSeed) : null}
          </div>

          <div style={{margin: '0 1.3vw 0 1.3vw', flex: '1'}} className={styles.scoreWrapper}>
            {this.renderAllianceSeed( 'red', this.props.redSeed, true)}
            {this.props.showLiveScoring ? this.renderAllianceResult(this.props.redScore, 'Red', this.props.redSeed) : null }
          </div>

          {this.renderAlliance(this.props.redAlliance)}
        </div>
      </div>
      <div style={{flex: '1', minWidth: '0', paddingTop: '1vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        { this.props.showLiveScoring ? this.renderLiveDetails('red') : null }
      </div>
    </>
  }

  renderComplete() {
    return <div className={styles.finalWrapper}>
      <Text size={100}>Awaiting final score</Text>
    </div>
  }

  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        {this.props.showComplete ?  this.renderComplete() : this.renderLive() }
      </PrimaryLayout>
    )
  }
}
