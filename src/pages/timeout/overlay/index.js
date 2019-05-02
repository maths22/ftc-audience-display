import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../../layout/primary'
import Heading from '../../../components/heading'
import Text from '../../../components/text'
import Panel from '../../../layout/panel'
import Pill from '../../../layout/pill'
import OverlayLayout from '../../../layout/overlay'

export default class TimeoutOverlay extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    time: PropTypes.string,
    allianceTimeout: PropTypes.string
  }

  renderHeading() {
    return <Heading size={40} key={'text'} align='center'>Timeout</Heading>;
  }

  renderFooter() {
    return <Heading size={40} align='center'>{this.props.eventName}</Heading>
  }

  render() {
    return (
      <OverlayLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'} flip={this.props.flip}>
        <Panel tight width={102} height={23} flex={'column'} flexAlign={'stretch'}>
            <Text outerWidth='100%' size={100} lineHeight='1em' align={'center'}>
              {[...this.props.time].map((c, idx) => <span key={idx} style={{width: c == ':' ? '0.25em' : '0.6em', display: 'inline-block', textAlign: 'center'}}>{c}</span>)}
            </Text>
            <Text size={50} align={'center'}>{this.props.allianceTimeout}</Text>
        </Panel>
      </OverlayLayout>
    )
  }
}
