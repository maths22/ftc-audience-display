import * as React from 'react'

import Heading from '../../../components/heading'
import Text from '../../../components/text'
import Panel from '../../../layout/panel'
import OverlayLayout from '../../../layout/overlay'
import {Props} from "../types";

export default class AwardsOverlay extends React.Component<Props> {
  renderHeading() {
    return <Heading size={40} key={'text'} align='center'>Awards</Heading>
  }

  renderFooter() {
    return <Heading size={40} align='center'>{this.props.eventName}</Heading>
  }

  // TODO test with robotgameaward
  winner() {
    if (this.props.position !== 0 && !this.props.isRobotGameAward) return null;
    if (this.props.position !== 2 && this.props.isRobotGameAward) return null;
    const label = this.props.isRobotGameAward ? 'Captain:\n' : 'Winner:\n';

    return <>{label} {this.isTeamAward ? <>{this.firstAssignment.team.data.number} &ndash; <span style={{fontSize: '0.7em'}}>{this.firstAssignment.team.data.name}</span></> : this.firstAssignment.name}</>
  }

  secondPlace() {
    if (this.props.position !== 1) return null;
    const label = this.props.isRobotGameAward ? <>1<sup>st</sup> pick: </> : 'Second:\n';

    return <>{label} {this.isTeamAward ? <>{this.secondAssignment.team.data.number} &ndash; <span style={{fontSize: '0.7em'}}>{this.secondAssignment.team.data.name}</span></> : this.secondAssignment.name}</>
  }

  thirdPlace() {
    if (this.props.position !== 0 && this.props.isRobotGameAward) return null;
    if (this.props.position !== 2 && !this.props.isRobotGameAward) return null;
    const label = this.props.isRobotGameAward ? <>2<sup>nd</sup> pick: </> : 'Third:\n';
    return <>{label} {this.isTeamAward ? <>{this.thirdAssignment.team.data.number} &ndash; <span style={{fontSize: '0.7em'}}>{this.thirdAssignment.team.data.name}</span></> : this.thirdAssignment.name}</>
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
      <OverlayLayout heading={this.renderHeading()} footer={this.renderFooter()} flip={this.props.flip}>
        <Panel tight width={102} height={23} flex={'vertical'} flexAlign={'stretch'} flexJustify={'center'}>
          <Text size={this.props.position == null ? 80 : 50} align={'center'}>{this.props.award.name}</Text>
          {this.props.position == null ? null : <Text size={75} align={'center'}>
            {this.secondPlace()}
            {this.winner()}
            {this.thirdPlace()}
          </Text>}
        </Panel>
      </OverlayLayout>
    )
  }
}
