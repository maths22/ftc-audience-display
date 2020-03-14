import * as React from 'react'

import styles from './styles.module.css'
import Heading from '../../../components/heading'
import Text from '../../../components/text'
import Panel from '../../../layout/panel'
import Pill from '../../../layout/pill'
import OverlayLayout from '../../../layout/overlay'

import blockBall from '../graphics/block_ball.png'
import blockAbsent from '../graphics/block_absent.png'
import blockPresent from '../graphics/block_present.png'
import ballAbsent from '../graphics/ball_absent.png'
import ballPresent from '../graphics/ball_present.png'
import {Alliance, ChildProps} from "../types";

const periodColors = {
  'stopped': 'grey',
  'auto': 'yellow',
  'pickup': 'red',
  'teleop': 'green',
  'endgame': 'red',
  'complete': 'green',
  'aborted': 'red'
};

export default class MatchTimerOverlay extends React.Component<ChildProps> {

  renderHeading() {
    return <Heading size={40} key={'text'} align='center'>{this.props.matchName}</Heading>
  }

  renderFooter() {
    return <Heading size={40} align='center'>{this.props.eventName}</Heading>
  }

  //TODO card carries probably
  renderAlliance(alliance : Alliance, color : 'red' | 'blue', seed : number | undefined) {
    return <div style={{display: 'flex', flexDirection: 'column', width: '11vh'}}>
      {seed ? <Pill extraTight width='100%' background={color}>
        <Text size={35} lineHeight='1em'>{seed}</Text>
      </Pill> : null}
      {alliance.map((t) =>
        <Pill key={t.number} extraTight width='100%' background={t.cardCarries ? ['#ffff33', '#232323'] : 'extraLightGrey'}>
          <Text size={35} lineHeight='1em'>{t.number}</Text>
        </Pill>)}
    </div>
  }

  renderAllianceResult(score : number, color : 'Red' | 'Blue') {
    return <div style={{margin: 'auto 1.3vw 0 1.3vw', flex: '1'}}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Pill background={color.toLowerCase()}
          customStyles={{minWidth: '18vh'}}>
          <Text size={80} lineHeight='1em'>{score.toString()}</Text>
        </Pill>
      </div>
    </div>
  }

  renderComplete() {
    return <Panel tight width={102} height={23} flex={'vertical'} flexAlign={'stretch'} flexJustify={'center'}>
      <Text size={80} align={'center'}>Awaiting final score</Text>
    </Panel>
  }

  renderLiveDetails(color : 'red' | 'blue') {
    if (this.props.period === 'aborted') return null;
    const score = (color === 'red' ? this.props.redScoreDetails : this.props.blueScoreDetails) || {};
    const autoPeriods = ['stopped', 'auto', 'pickup'];

    if (autoPeriods.includes(this.props.period)) {
      const random = this.props.random || 1;
      const blockRow = [blockPresent, blockAbsent];
      const ballRow = [ballPresent, ballAbsent];
      const rows = [
        random === 1 || random === 6 ? blockRow : ballRow,
        random === 2 || random === 5 ? blockRow : ballRow,
        random === 3 || random === 4 ? blockRow : ballRow
      ];
      const backLeftSampleFieldState = score.backLeftSampleFieldState !== undefined ? score.backLeftSampleFieldState : 7;
      const backRightSampleFieldState = score.backRightSampleFieldState !== undefined ? score.backRightSampleFieldState : 7;
      const frontLeftSampleFieldState = score.frontLeftSampleFieldState !== undefined ? score.frontLeftSampleFieldState : 7;
      const frontRightSampleFieldState = score.frontRightSampleFieldState !== undefined ? score.frontRightSampleFieldState : 7;

      return <Panel extraTight height={23} width={30} flex={'vertical'} flexAlign={'center'}>
        <Text size={35}>Auto</Text>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div className={styles.scoreRow} style={{flex: 1, padding: '0 1vw'}}>

            <img src={(backLeftSampleFieldState & 4) ? rows[0][0] : rows[0][1]} className={styles.miniImage} alt={"sampling field 3"}/>

            <img src={(backLeftSampleFieldState & 2) ? rows[1][0] : rows[1][1]} className={styles.miniImage} alt={"sampling field 3"}/>

            <img src={(backLeftSampleFieldState & 1) ? rows[2][0] : rows[2][1]} className={styles.miniImage} alt={"sampling field 3"}/>
          </div>
          <div className={styles.scoreRow} style={{flex: 1, padding: '0 1vw'}}>

            <img src={(backRightSampleFieldState & 4) ? rows[0][0] : rows[0][1]} className={styles.miniImage} alt={"sampling field 4"}/>

            <img src={(backRightSampleFieldState & 2) ? rows[1][0] : rows[1][1]} className={styles.miniImage} alt={"sampling field 4"}/>

            <img src={(backRightSampleFieldState & 1) ? rows[2][0] : rows[2][1]} className={styles.miniImage} alt={"sampling field 4"}/>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div className={styles.scoreRow} style={{flex: 1, padding: '0 1vw'}}>

            <img src={(frontLeftSampleFieldState & 4) ? rows[0][0] : rows[0][1]} className={styles.miniImage} alt={"sampling field 1"}/>

            <img src={(frontLeftSampleFieldState & 2) ? rows[1][0] : rows[1][1]} className={styles.miniImage} alt={"sampling field 1"}/>

            <img src={(frontLeftSampleFieldState & 1) ? rows[2][0] : rows[2][1]} className={styles.miniImage} alt={"sampling field 1"}/>
          </div>
          <div className={styles.scoreRow} style={{flex: 1, padding: '0 1vw'}}>

            <img src={(frontRightSampleFieldState & 4) ? rows[0][0] : rows[0][1]} className={styles.miniImage} alt={"sampling field 2"}/>

            <img src={(frontRightSampleFieldState & 2) ? rows[1][0] : rows[1][1]} className={styles.miniImage} alt={"sampling field 2"}/>

            <img src={(frontRightSampleFieldState & 1) ? rows[2][0] : rows[2][1]} className={styles.miniImage} alt={"sampling field 2"} />
          </div>
        </div>
      </Panel>
    } else {
      return <>
        <Panel extraTight height={23} width={12} flex={'vertical'} flexAlign={'center'} flexJustify={'center'}>
          <Text size={35}>Depot</Text>

          <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <div className={styles.scoreRow} style={{flex: 1}}>

              <img src={blockBall} className={styles.miniImage} alt={"block/ball"} />
              <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{score.depot || 0}</Text></span>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <div className={styles.scoreRow} style={{flex: 1, background: color === 'red' ? '#FF5555BB' : '#3264FFBB', borderRadius: '2vh'}}>

              <img src={blockBall} className={styles.miniImage} alt={"block/ball"} />
              <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{score.depotPlatinum || 0}</Text></span>
            </div>
          </div>
        </Panel>
        <Panel extraTight height={23} width={19} flex={'vertical'} flexAlign={'center'}>
          <Text size={35}>Lander</Text>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <div className={styles.scoreRow} style={{flex: 1}}>

              <img src={blockPresent} className={styles.miniImage} alt={"block"}/>
              <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{(score.frontGold || 0) + (score.backGold || 0)}</Text></span>
            </div>
            <div className={styles.scoreRow} style={{flex: 1}}>

              <img src={blockBall} className={styles.miniImage} alt={"block/ball"} />
              <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{(score.any || 0)}</Text></span>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <div className={styles.scoreRow} style={{flex: 1}}>

              <img src={ballPresent} className={styles.miniImage} alt={"ball"} />
              <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{(score.silver || 0)}</Text></span>
            </div>
            <div className={styles.scoreRow} style={{flex: 1, background: color === 'red' ? '#FF5555BB' : '#3264FFBB', borderRadius: '2vh'}}>

              <img src={blockBall} className={styles.miniImage} alt={"block/ball"} />
              <span style={{flex: 1, paddingLeft: '0.75vw', textAlign: 'center'}}><Text size={40}>{(score.ownAnyPlatinum || 0) + (score.ownFrontGoldPlatinum || 0) + (score.ownBackGoldPlatinum || 0) + (score.ownSilverPlatinum || 0) +
               (score.theirAnyPlatinum || 0) + (score.theirFrontGoldPlatinum || 0) + (score.theirBackGoldPlatinum || 0) + (score.theirSilverPlatinum || 0)}</Text></span>
            </div>
          </div>
        </Panel>
      </>
    }
  }

  renderLive() {
    const color = periodColors[this.props.period] || 'grey';

    return <>
      <div style={{flex: '1', minWidth: '0', paddingTop: '0.75vh', display: 'flex', flexDirection: 'row', alignItems: 'space-around', justifyContent: 'center'}}>
        {this.props.showLiveScoring ? this.renderLiveDetails('blue') : null }
      </div>
      <div style={{paddingTop: '0.25vh', display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '40vw'}}>

        <div style={{paddingTop: '0.25vh', display: 'flex', flexDirection: 'row', alignItems: 'stretch', margin: '0 auto'}}>
          {this.renderAlliance(this.props.blueAlliance, 'blue', this.props.blueSeed)}

          <div>
            <Panel extraTight border={false} flex={'horizontal'}
              background={[`linear-gradient(to right, ${color} 0%,${color} ` + this.props.percentComplete * 100 + '%,#f7f6f6 ' + this.props.percentComplete * 100 + '%,#f7f6f6 100%)', '#232323']}
              flexAlign='center'
              flexJustify='center'
              customStyles={{
                transitionProperty: 'background',
                transitionDuration: '.1s',
                transitionTimingFunction: 'linear',
                minWidth: '23vw'
              }}>
              {/* TODO dynamic color */}
              <Pill width='6vw' background={['#BBBBBBaa', '#232323']} extraTight>
                <Text size={35}>
                  {[...this.props.time].map((c, idx) => <span key={idx} style={{width: c === ':' ? '0.25em' : '0.6em', display: 'inline-block', textAlign: 'center'}}>{c}</span>)}
                </Text>
              </Pill>
            </Panel>
            {this.props.showLiveScoring ? <div style={{display: 'flex', flexDirection: 'row', alignItems: 'stretch'}}>
              {this.renderAllianceResult(this.props.blueScore, 'Blue')}
              {this.renderAllianceResult(this.props.redScore, 'Red')}
            </div> : null}
          </div>

          {this.renderAlliance(this.props.redAlliance, 'red', this.props.redSeed)}
        </div>
      </div>
      <div style={{flex: '1', minWidth: '0', paddingTop: '0.75vh', display: 'flex', flexDirection: 'row', alignItems: 'space-around', justifyContent: 'center'}}>
        {this.props.showLiveScoring ? this.renderLiveDetails('red') : null }
      </div>
    </>
  }

  render() {
    return (
      <OverlayLayout heading={this.renderHeading()} footer={this.renderFooter()} flip={this.props.flip}>
        {this.props.showComplete ? this.renderComplete() : this.renderLive()}
      </OverlayLayout>
    )
  }
}
