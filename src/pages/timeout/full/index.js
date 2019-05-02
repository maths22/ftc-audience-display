import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../../layout/primary'
import Heading from '../../../components/heading'
import Text from '../../../components/text'
import Panel from '../../../layout/panel'
import Pill from '../../../layout/pill'

export default class Timeout extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    time: PropTypes.string,
    allianceTimeout: PropTypes.string
  }

  renderHeading() {
    return <Heading size={70} key={'text'} align='center'>Timeout</Heading>;
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.wrapper}>
          <div style={{width: '40vw', display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
            <Panel extraTight border={false} flex={'horizontal'} background={'extraLightGrey'} flexAlign='center'>
              <Text outerWidth='100%' size={350} lineHeight='1em' align={'center'}>
                {[...this.props.time].map((c, idx) => <span key={idx} style={{width: c == ':' ? '0.25em' : '0.6em', display: 'inline-block', textAlign: 'center'}}>{c}</span>)}
              </Text>
            </Panel>
          </div>
          <Text size={100}>{this.props.allianceTimeout}</Text>
        </div>
      </PrimaryLayout>
    )
  }
}
