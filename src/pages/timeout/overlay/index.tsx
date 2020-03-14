import * as React from 'react'

import Heading from '../../../components/heading'
import Text from '../../../components/text'
import Panel from '../../../layout/panel'
import OverlayLayout from '../../../layout/overlay'
import {Props} from "../types";

export default class TimeoutOverlay extends React.Component<Props> {
  renderHeading() {
    return <Heading size={40} key={'text'} align='center'>Timeout</Heading>
  }

  renderFooter() {
    return <Heading size={40} align='center'>{this.props.eventName}</Heading>
  }

  render() {
    return (
      <OverlayLayout heading={this.renderHeading()} footer={this.renderFooter()} flip={this.props.flip}>
        <Panel tight width={102} height={23} flex={'column'} flexAlign={'stretch'}>
          <Text outerWidth='100%' size={100} lineHeight='1em' align={'center'}>
            {[...this.props.time].map((c, idx) => <span key={idx} style={{width: c === ':' ? '0.25em' : '0.6em', display: 'inline-block', textAlign: 'center'}}>{c}</span>)}
          </Text>
          <Text size={50} align={'center'}>{this.props.allianceTimeout}</Text>
        </Panel>
      </OverlayLayout>
    )
  }
}
