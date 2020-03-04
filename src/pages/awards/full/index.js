import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../../layout/primary'
import Heading from '../../../components/heading'
import Text from '../../../components/text'
import Panel from '../../../layout/panel'
import Pill from '../../../layout/pill'

export default class Awards extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    actionType: PropTypes.string,
    isRobotGameAward: PropTypes.bool,
    award: PropTypes.shape({
      name: PropTypes.string,
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
    return <Heading size={70} key={'text'} align='center'>{this.props.award.name}</Heading>;
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  winner() {
    if(this.props.actionType === 'SHOW_AWARD') return null;
    if(this.props.actionType === 'SHOW_THIRD' && !this.props.isRobotGameAward) return null;
    if(this.props.actionType === 'SHOW_SECOND' && !this.props.isRobotGameAward) return null;
    const award = this.props.award
    const label = this.props.isRobotGameAward ? 'Captain:\n' : 'Winner:\n'
    return label + (award.teamAward ? award.winnerTeam.data.number + ' \u2013 ' + award.winnerTeam.data.name : award.winnerName)
  }

  secondPlace() {
    if(this.props.actionType === 'SHOW_AWARD') return null;
    if(this.props.actionType === 'SHOW_THIRD') return null;
    const award = this.props.award
    const label = this.props.isRobotGameAward ? <>1<sup>st</sup> pick: <br/></> : 'Second place:\n'

    return <>{label} {award.teamAward ? award.secondTeam.data.number + ' \u2013 ' + award.secondTeam.data.name : award.secondName}</>
  }

  thirdPlace() {
    if(this.props.actionType === 'SHOW_AWARD') return null;
    if(this.props.actionType === 'SHOW_THIRD' && this.props.isRobotGameAward) return null;
    if(this.props.actionType === 'SHOW_SECOND' && this.props.isRobotGameAward) return null;
    const award = this.props.award
    const label = this.props.isRobotGameAward ? <>2<sup>nd</sup> pick: <br/></> : 'Third place:\n'
    return <>{label} {award.teamAward ? award.thirdTeam.data.number + ' \u2013 ' + award.thirdTeam.data.name : award.thirdName}</>
  }

  render() {
    console.log(this.props)
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.wrapper}>
          <Text size={75}>{this.winner()}</Text>
          <Text size={60}>{this.secondPlace()}</Text>
          <Text size={60}>{this.thirdPlace()}</Text>
        </div>
      </PrimaryLayout>
    )
  }
}
