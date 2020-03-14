import * as React from 'react'

import styles from './styles.module.css'
import classnames from 'classnames'

type Props = {
  height?: string,
  width?: string,
  tight?: boolean,
  extraTight?: boolean,
  background: string | string[] | null[],
  customStyles?: object
}

export default class Pill extends React.Component<Props> {
  render() {
    const {
      width,
      height,
      children,
      extraTight,
      tight,
      background,
      customStyles
    } = this.props;

    const colors = Array.isArray(background) ? background : {
      darkGrey: ['#606060BF', '#F7F6F6'],
      lightGrey: ['#BBBBBB', '#232323'],
      extraLightGrey: ['#f7f6f6', '#232323'],
      red: ['#FF5555', '#F7F6F6'],
      blue: ['#3264FF', '#F7F6F6']
    }[background];

    return (
      <div className={classnames(styles.pill, tight ? styles.pillTightEdges : (extraTight ? styles.pillExtraTightEdges : styles.pillEdges))}
        style={{
          width: width,
          height: height,
          background: colors[0],
          color: colors[1],
          ...customStyles
        }}>
        {children}
      </div>
    )
  }
}
