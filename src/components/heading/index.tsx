import * as React from 'react'
import { TextAlignProperty } from 'csstype';

import styles from './styles.module.css'
import ScrollingText from '../scrollingText'

type Props = {
  size: number,
  align: TextAlignProperty,
  width?: string
}

export default class Heading extends React.Component<Props> {

  render() {
    const {
      size,
      align,
      width,
      children
    } = this.props;

    return (
      <span className={styles.heading} style={{fontSize: `${size / 1080 * 90}vh`, textAlign: align}}>
        <ScrollingText width={width || '100%'} text={children} />
      </span>
    )
  }
}
