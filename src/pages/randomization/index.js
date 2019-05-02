import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Die from '../../components/die'

import ball from './ball.png'
import block from './block.png'

class RandomDisplay extends Component {
  static propTypes = {
    location: PropTypes.number,
  }

  renderCenterMineral() {
    return <img src={this.props.location === 1 ? block : ball} style={{position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, marginTop: 'auto', marginBottom: 'auto', top: 0, bottom: 0, height: '5em' }}/>
  }

  renderUpperRightMineral() {
    return <img src={this.props.location === 2 ? block : ball} style={{ position: 'absolute', right: '0em', top: '0em', height: '5em' }}/>
  }

  renderBottomLeftMineral() {
    return <img src={this.props.location === 0 ? block : ball} style={{ position: 'absolute', left: '0em', bottom: '0em', height: '5em' }}/>
  }

  renderBottomRightCorner() {
    return <div style={{ position: 'absolute', right: '0em', bottom: '0em', height: '3em', width: '3em', borderColor: '#f7f6f6', borderStyle: 'solid', borderWidth: '0 0.5em 0.5em 0' }}/>
  }

  render() {
    return (
      <div style={{position: 'relative', width: '15em', height: '15em'}}>
        {this.renderCenterMineral()}
        {this.renderUpperRightMineral()}
        {this.renderBottomLeftMineral()}
        {this.renderBottomRightCorner()}
      </div>
    )
  }
}

export default class Randomization extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    matchName: PropTypes.string,
    random: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {currentSponsor: null, currentIdx: -1}
  }

  renderHeading() {
    return <Heading size={70} key={'text'} align='center'>{this.props.matchName}</Heading>
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }


  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.tableWrapper} style={{fontSize: '3.5vh'}}>
          <Die number={this.props.random} />
        </div>
        <div className={styles.tableWrapper} style={{fontSize: '3.5vh'}}>
          <RandomDisplay location={Math.floor((this.props.random - 1) % 3)} />
        </div>
      </PrimaryLayout>
    )
  }
}