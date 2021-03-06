import * as React from 'react'

import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import Panel from '../../layout/panel'
import {BaseProps} from "../../baseProps";

type Sponsor = {
  number: number,
  level: 'GLOBAL' | 'REGIONAL' | 'EVENT',
  name?: string,
  logoPath?: string
}

type Props = BaseProps & {
  sponsors: Sponsor[]
}

type State = {
  currentSponsor: Sponsor | null,
  currentIdx: number,
  intervalId?: number
}

export default class Sponsors extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);
    this.state = {currentSponsor: null, currentIdx: -1}
  }

  componentDidMount() {
    this.updateCurrent();
    const intervalId = window.setInterval(this.updateCurrent, 10000);
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  updateCurrent = () => {
    const nextIdx = (this.state.currentIdx + 1) % this.props.sponsors.length;
    this.setState({
      currentIdx: nextIdx,
      currentSponsor: this.props.sponsors[nextIdx]
    })
  };

  renderHeading() {
    return <Heading size={70} key={'text'} align='center'>{
      this.state.currentSponsor && (this.state.currentSponsor.name && this.state.currentSponsor.logoPath)
        ? this.state.currentSponsor.name
        : 'Sponsors'}</Heading>
  }

  renderFooter() {
    if (!this.state.currentSponsor) return <Heading size={70} align='center'>{this.props.eventName + ' Sponsors'}</Heading>;
    const text = {
      'GLOBAL': <span><i>FIRST</i> Tech Challenge Global Sponsors</span>,
      'REGIONAL': 'Regional Sponsors',
      'EVENT': this.props.eventName + ' Sponsors'
    }[this.state.currentSponsor.level];
    return <Heading size={70} align='center'>{text}</Heading>
  }

  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <Panel background='extraLightGrey' width={100} flex={'horizontal'} flexAlign={'center'} flexJustify={'center'}>
          {this.state.currentSponsor && !this.state.currentSponsor.logoPath && this.state.currentSponsor.name
            ? <Text noScroll size={125} align='center'>{this.state.currentSponsor.name}</Text>
            : null}
          {this.state.currentSponsor && this.state.currentSponsor.logoPath
            ? <img style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} src={this.props.sponsorImageBase + this.state.currentSponsor.logoPath} alt={`Logo of ${this.state.currentSponsor.name}`} /> : null}
        </Panel>
      </PrimaryLayout>
    )
  }
}
