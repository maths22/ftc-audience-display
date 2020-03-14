import * as React from 'react'

import styles from './styles.module.css'
import PrimaryLayout from '../../../layout/primary'
import Heading from '../../../components/heading'
import Text from '../../../components/text'
import {Props} from "../types";

export default class Awards extends React.Component<Props> {

  renderHeading() {
    return <Heading size={70} key={'text'} align='center'>{this.props.award.name}</Heading>
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  winner() {
    if (this.props.position === null) return null;
    if (this.props.position === 2 && !this.props.isRobotGameAward) return null;
    if (this.props.position === 1 && !this.props.isRobotGameAward) return null;
    if (!(this.firstAssignment.team || this.firstAssignment.name)) return null;
    const label = this.props.isRobotGameAward ? 'Captain:\n' : 'Winner:\n';
    return label + (this.isTeamAward ? this.firstAssignment.team.data.number + ' \u2013 ' + this.firstAssignment.team.data.name : this.firstAssignment.name)
  }

  secondPlace() {
    if (this.props.position === null) return null;
    if (this.props.position === 2) return null;
    if (!(this.secondAssignment.team || this.secondAssignment.name)) return null;
    const label = this.props.isRobotGameAward ? <>1<sup>st</sup> pick: <br /></> : 'Second place:\n';

    return <>{label} {this.isTeamAward ? this.secondAssignment.team.data.number + ' \u2013 ' + this.secondAssignment.team.data.name : this.secondAssignment.name}</>
  }

  thirdPlace() {
    if (this.props.position === null) return null;
    if (this.props.position === 2 && this.props.isRobotGameAward) return null;
    if (this.props.position === 1 && this.props.isRobotGameAward) return null;
    if (!(this.thirdAssignment.team || this.thirdAssignment.name)) return null;
    const label = this.props.isRobotGameAward ? <>2<sup>nd</sup> pick: <br /></> : 'Third place:\n';
    return <>{label} {this.isTeamAward ? this.thirdAssignment.team.data.number + ' \u2013 ' + this.thirdAssignment.team.data.name : this.thirdAssignment.name}</>
  }

  get isTeamAward() {
    return this.props.award.type === 0
  }

  get firstAssignment() {
    return this.props.award.assignments[0]
  }

  get secondAssignment() {
    return this.props.award.assignments[1]
  }

  get thirdAssignment() {
    return this.props.award.assignments[2]
  }

  render() {
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
