import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import Panel from '../../layout/panel'
import Pill from '../../layout/pill'
import ScrollingTable from '../../components/scrollingTable'
import AllianceBar from '../../components/allianceBar'
import classnames from 'classnames'

export default class Message extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    message: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  renderHeading() {
    return <Heading size={70} align='center'>Announcement</Heading>
  }

  renderFooter() {
    return <Heading size={70} align='center'>{this.props.eventName}</Heading>
  }

  render() {
    return (
      <PrimaryLayout heading={this.renderHeading()} footer={this.renderFooter()} bodyFlex={'horizontal'}>
        <div className={styles.wrapper}>
          <Text size={100}>{this.props.message}</Text>
        </div>
      </PrimaryLayout>
    )
  }
}
