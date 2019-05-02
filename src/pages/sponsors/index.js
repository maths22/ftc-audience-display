import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import Panel from '../../layout/panel'
import Pill from '../../layout/pill'

export default class Sponsors extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    sponsors: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      level: PropTypes.string,
      name: PropTypes.string,
      logoPath: PropTypes.string
    }))
  }

  constructor(props) {
    super(props)
    this.state = {currentSponsor: null, currentIdx: -1}
  }

  componentDidMount() {
    this.updateCurrent()
    const intervalId = setInterval(this.updateCurrent, 10000)
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
  }

  renderHeading() {
    return <Heading size={70} key={'text'} align='center'>{
        this.state.currentSponsor && (this.state.currentSponsor.name && this.state.currentSponsor.logoPath)
          ? this.state.currentSponsor.name
        : 'Sponsors'}</Heading>
  }

  renderFooter() {
    if (!this.state.currentSponsor) return <Heading size={70} align='center'>{this.props.eventName + ' Sponsors'}</Heading>
    const text = {
      'GLOBAL': <span><i>FIRST</i> Tech Challenge Global Sponsors</span>,
      'REGIONAL': 'Regional Sponsors',
      'EVENT': this.props.eventName + ' Sponsors'
    }[this.state.currentSponsor.level]
    return <Heading size={70} align='center'>{text}</Heading>
  }

  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <Panel background='extraLightGrey' width={100} flex={'horizontal'} flexAlign={'center'} flexJustify={'center'}>
          {this.state.currentSponsor && !this.state.currentSponsor.logoPath && this.state.currentSponsor.name
            ? <Text noScroll size={125} align='center'>{this.state.currentSponsor.name}</Text>
            : null}
          {this.state.currentSponsor && this.state.currentSponsor.logoPath ? <img style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} src={this.props.sponsorImageBase + this.state.currentSponsor.logoPath}/> : null}
        </Panel>
      </PrimaryLayout>
    )
  }
}
