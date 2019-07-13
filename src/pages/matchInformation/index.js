import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import Panel from '../../layout/panel'
import Pill from '../../layout/pill'

export default class MatchInformation extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    matchName: PropTypes.string,
    blueRecord: PropTypes.number,
    redRecord: PropTypes.number,
    blueSeed: PropTypes.number,
    redSeed: PropTypes.number,
    blueAlliance: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
      ranking: PropTypes.number,
    })),
    redAlliance: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
      ranking: PropTypes.number,
    })),
  }

  renderRecordPanel(myRecord, otherRecord, color) {
    if(!myRecord) return;

    const isVictor = myRecord > otherRecord;

    return <Panel border={false} background={isVictor ? color.toLowerCase() : 'lightGrey'}>
      <Text size={40}>
        {isVictor ? (color + ' leads ') : (myRecord === otherRecord ? 'Series tied ' :(color + ' trails ') )}
        {myRecord} - {otherRecord}
      </Text>
    </Panel>
  }

  renderHeading() {
    return [
      this.renderRecordPanel(this.props.blueRecord, this.props.redRecord, 'Blue'),
      <Heading size={70} key={'text'} align='center'>{this.props.matchName}</Heading>,
      this.renderRecordPanel(this.props.redRecord, this.props.blueRecord, 'Red'),
    ]
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  renderAlliance(alliance, color) {
    return alliance.map((t) => <Panel key={t.number} border={false} flex={'horizontal'} background={color} flexAlign='center' customStyles={{
      border: t.cardCarries ? '1vmin #ffff33 solid' : null,
      height: '6vw'
    }}>
      <div style={{display: 'flex', flexDirection: 'column', minWidth: '0', flex: 1}}>
        <Text size={40}>{t.number.toString()}</Text>
        <Text size={30}>{t.name}</Text>
      </div>
      {t.ranking > 0 ? <Text size={45}>{t.ranking.toString()}</Text> : null}
    </Panel>)
  }

  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div style={{flex: '0 50%', minWidth: '0', paddingTop: '1vh'}}>
          <div style={{margin: '0 1.3vw', display: 'flex', alignItems: 'center'}}>
            {this.props.blueSeed ? <Pill tight background='blue' width='3em'><Text size={40}>{this.props.blueSeed}</Text></Pill> : null}
            <Heading size={50} align='center'>Blue Alliance</Heading>
          </div>
          <div>
           {this.renderAlliance(this.props.blueAlliance, 'blue')}
          </div>
        </div>
        <div style={{flex: '0 50%', minWidth: '0', paddingTop: '1vh'}}>
          <div style={{margin: '0 1.3vw', display: 'flex', alignItems: 'center'}}>
            <Heading size={50} align='center'>Red Alliance</Heading>
            {this.props.redSeed ? <Pill tight background='red' width='3em'><Text size={40}>{this.props.redSeed}</Text></Pill> : null}
          </div>
          <div>
            {this.renderAlliance(this.props.redAlliance, 'red')}
          </div>
        </div>
      </PrimaryLayout>
    )
  }
}
