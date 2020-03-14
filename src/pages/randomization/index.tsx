import * as React from 'react'

import styles from './styles.module.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Die from '../../components/die'

import ball from './ball.png'
import block from './block.png'
import {BaseProps} from "../../baseProps";

type RandomProps = {
  location: number
}

class RandomDisplay extends React.Component<RandomProps> {
  renderCenterMineral() {
    return <img src={this.props.location === 1 ? block : ball} style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, marginTop: 'auto', marginBottom: 'auto', top: 0, bottom: 0, height: '5em' }} alt={this.props.location === 1 ? 'block' : 'ball'} />
  }

  renderUpperRightMineral() {
    return <img src={this.props.location === 2 ? block : ball} style={{ position: 'absolute', right: '0em', top: '0em', height: '5em' }} alt={this.props.location === 2 ? 'block' : 'ball'} />
  }

  renderBottomLeftMineral() {
    return <img src={this.props.location === 0 ? block : ball} style={{ position: 'absolute', left: '0em', bottom: '0em', height: '5em' }} alt={this.props.location === 0 ? 'block' : 'ball'} />
  }

  renderBottomRightCorner() {
    return <div style={{ position: 'absolute', right: '0em', bottom: '0em', height: '3em', width: '3em', borderColor: '#f7f6f6', borderStyle: 'solid', borderWidth: '0 0.5em 0.5em 0' }} />
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

type Props = BaseProps & {
  matchName: string,
  random: number
}

export default class Randomization extends React.Component<Props> {
  renderHeading() {
    return <Heading size={70} key={'text'} align='center'>{this.props.matchName}</Heading>
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  render() {
    let val = -1;
    const random = this.props.random;
    if (random === 1 || random === 6) {
      val = 0
    }
    if (random === 2 || random === 5) {
      val = 1
    }
    if (random === 3 || random === 4) {
      val = 2
    }
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.tableWrapper} style={{fontSize: '3.5vh'}}>
          <Die number={this.props.random} />
        </div>
        <div className={styles.tableWrapper} style={{fontSize: '3.5vh'}}>
          <RandomDisplay location={val} />
        </div>
      </PrimaryLayout>
    )
  }
}
