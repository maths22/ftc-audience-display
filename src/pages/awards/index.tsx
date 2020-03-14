import overlayable from '../../components/overlayable'
import AwardsOverlay from './overlay'
import Awards from './full'
import * as React from 'react'
import {Props} from "./types";

const Award = overlayable<Props>(Awards, AwardsOverlay);

type WrapperProps = Props

export default class AwardWrapper extends React.Component<WrapperProps> {
  render() {
    let position : number | undefined = this.props.position;
    if (position && position < 0) {
      position = undefined
    }

    if (this.props.actionType === 'SHOW_WINNER') {
      position = 0
    }
    if (this.props.actionType === 'SHOW_SECOND') {
      position = 1
    }
    if (this.props.actionType === 'SHOW_THIRD') {
      position = 2
    }

    return <Award {...this.props} position={position} />
  }
}
