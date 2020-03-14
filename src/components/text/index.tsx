import * as React from 'react'
import { TextAlignProperty } from 'csstype';

import styles from './styles.module.css'
import ScrollingText from '../scrollingText'

type Props = {
  size: number,
  width?: string,
  outerWidth?: string,
  align?: TextAlignProperty,
  lineHeight?: string,
  noScroll?: boolean
}

export default class Text extends React.Component<Props> {

  render() {
    const {
      size,
      align,
      width,
      outerWidth,
      lineHeight,
      children,
      noScroll
    } = this.props;

    return (
      <span className={styles.text} style={{fontSize: `${size / 1080 * 90}vh`, textAlign: align, lineHeight: lineHeight, width: outerWidth}}>
        {noScroll ? children : <ScrollingText width={width || '100%'} text={children} />}
      </span>
    )
  }
}
