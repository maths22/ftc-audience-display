import * as React from 'react'

import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import Panel from '../../layout/panel'
import Pill from '../../layout/pill'
import {BaseProps} from '../../baseProps'

type Alliance = Array<{
  number: number,
  name: string,
  ranking?: number,
  cardCarries: boolean
}>

type Props = BaseProps & {
  matchName: string,
  blueRecord?: number,
  redRecord?: number,
  blueSeed?: number,
  redSeed?: number,
  blueAlliance: Alliance,
  redAlliance: Alliance
}

export default class MatchInformation extends React.Component<Props> {

  renderRecordPanel(myRecord? : number, otherRecord? : number, color? : 'Red' | 'Blue') {
    if (myRecord === undefined) return;
    if (otherRecord == undefined) return;
    if (!myRecord && !otherRecord) return;

    const isVictor = myRecord > otherRecord;

    return <Panel border={false} background={isVictor ? color!.toLowerCase() : 'lightGrey'}>
      <Text size={40}>
        {isVictor ? (color + ' leads ') : (myRecord === otherRecord ? 'Series tied ' : (color + ' trails '))}
        {myRecord} - {otherRecord}
      </Text>
    </Panel>
  }

  renderHeading() {
    return [
      this.renderRecordPanel(this.props.blueRecord, this.props.redRecord, 'Blue'),
      <Heading size={70} key={'text'} align='center'>{this.props.matchName}</Heading>,
      this.renderRecordPanel(this.props.redRecord, this.props.blueRecord, 'Red')
    ]
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  renderAlliance(alliance : Alliance, color : 'red' | 'blue') {
    return alliance.map((t) => <Panel key={t.number} border={false} flex={'horizontal'} background={color} flexAlign='center' customStyles={{
      border: t.cardCarries ? '1vmin #ffff33 solid' : null,
      height: '6vw'
    }}>
      <div style={{display: 'flex', flexDirection: 'column', minWidth: '0', flex: 1}}>
        <Text size={40}>{t.number.toString()}</Text>
        <Text size={30}>{t.name}</Text>
      </div>
      {t.ranking && t.ranking > 0 ? <Text size={45}>{t.ranking.toString()}</Text> : null}
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
