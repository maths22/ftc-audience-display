import * as React from 'react'

import styles from './styles.module.css'
import PrimaryLayout from '../../layout/primary'
import Heading from '../../components/heading'
import Text from '../../components/text'
import {BaseProps} from "../../baseProps";

type Props = BaseProps & {
  message: string
}

export default class Message extends React.Component<Props> {
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
