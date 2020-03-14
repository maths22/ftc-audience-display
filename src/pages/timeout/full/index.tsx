import * as React from 'react'

import styles from './styles.module.css'
import PrimaryLayout from '../../../layout/primary'
import Heading from '../../../components/heading'
import Text from '../../../components/text'
import Panel from '../../../layout/panel'
import {Props} from "../types";

export default class Timeout extends React.Component<Props> {
  renderHeading() {
    return <Heading size={70} key={'text'} align='center'>Timeout</Heading>
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
                {[...this.props.time].map((c, idx) => <span key={idx} style={{width: c === ':' ? '0.25em' : '0.6em', display: 'inline-block', textAlign: 'center'}}>{c}</span>)}
              </Text>
            </Panel>
          </div>
          <Text size={100}>{this.props.allianceTimeout}</Text>
        </div>
      </PrimaryLayout>
    )
  }
}
