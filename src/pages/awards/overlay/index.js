import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../../layout/primary'
import Heading from '../../../components/heading'
import Text from '../../../components/text'
import Panel from '../../../layout/panel'
import Pill from '../../../layout/pill'
import OverlayLayout from '../../../layout/overlay'

export default class AwardsOverlay extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    actionType: PropTypes.string,
    isRobotGameAward: PropTypes.bool,
    award: PropTypes.shape({
      teamAward: PropTypes.bool,
      winnerTeam: PropTypes.shape({
        number: PropTypes.string,
        name: PropTypes.string,
      }),
      winnerName: PropTypes.string,
      secondTeam: PropTypes.shape({
        number: PropTypes.string,
        name: PropTypes.string,
      }),
      secondName: PropTypes.string,
      thirdTeam: PropTypes.shape({
        number: PropTypes.string,
        name: PropTypes.string,
      }),
      thirdName: PropTypes.string,
    })
  }

  renderHeading() {
    return <Heading size={40} key={'text'} align='center'>Awards</Heading>;
  }

  renderFooter() {
    return <Heading size={40} align='center'>{this.props.eventName}</Heading>
  }


  winner() {
    if(this.props.actionType === 'SHOW_AWARD') return null;
    if(this.props.actionType !== 'SHOW_WINNER' && !this.props.isRobotGameAward) return null;
    if(this.props.actionType !== 'SHOW_THIRD' && this.props.isRobotGameAward) return null;
    const award = this.props.award
    const label = this.props.isRobotGameAward ? 'Captain:\n' : 'Winner:\n'
    return <>{label} {award.teamAward ? <>{award.winnerTeam.data.number} &ndash; <span style={{fontSize: '0.7em'}}>{award.winnerTeam.data.name}</span></> : award.winnerName}</>
  }

  secondPlace() {
    if(this.props.actionType === 'SHOW_AWARD') return null;
    if(this.props.actionType !== 'SHOW_SECOND') return null;
    const award = this.props.award
    const label = this.props.isRobotGameAward ? <>1<sup>st</sup> pick: </> : 'Second:\n'

    return <>{label} {award.teamAward ? <>{award.secondTeam.data.number} &ndash; <span style={{fontSize: '0.7em'}}>{award.secondTeam.data.name}</span></> : award.secondName}</>
  }

  thirdPlace() {
    if(this.props.actionType === 'SHOW_AWARD') return null;
    if(this.props.actionType !== 'SHOW_WINNER' && this.props.isRobotGameAward) return null;
    if(this.props.actionType !== 'SHOW_THIRD' && !this.props.isRobotGameAward) return null;
    const award = this.props.award
    const label = this.props.isRobotGameAward ? <>2<sup>nd</sup> pick: </> : 'Third:\n'
    return <>{label} {award.teamAward ? <>{award.thirdTeam.data.number} &ndash; <span style={{fontSize: '0.7em'}}>{award.thirdTeam.data.name}</span></> : award.thirdName}</>
  }

  render() {
    return (
      <OverlayLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'} flip={this.props.flip}>
        <Panel tight width={102} height={23} flex={'vertical'} flexAlign={'stretch'} flexJustify={'center'}>
          <Text size={this.props.actionType === 'SHOW_AWARD' ? 80 : 50} align={'center'}>{this.props.award.name}</Text>
          {this.props.actionType === 'SHOW_AWARD' ? null :<Text size={75} align={'center'}>
            {this.secondPlace()}
            {this.winner()}
            {this.thirdPlace()}
          </Text>}
        </Panel>
      </OverlayLayout>
    )
  }
}
