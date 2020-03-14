import * as React from 'react'
import { FlexProperty, AlignItemsProperty, JustifyContentProperty } from 'csstype';

import styles from './styles.module.css'
import classnames from 'classnames'

type Props = {
  height?: number,
  width?: number,
  flex?: FlexProperty<string>,
  flexAlign?: AlignItemsProperty,
  flexJustify?: JustifyContentProperty,
  border?: boolean,
  tight?: boolean,
  extraTight?: boolean,
  background?: string | string[],
  customStyles?: object
}

export default class Panel extends React.Component<Props> {
  static defaultProps = {
    border: true,
    background: 'darkGrey',
    tight: false,
    extraTight: false
  };

  static get marginHeight() {
    return 2.5
  }

  render() {
    const {
      height,
      width,
      flex,
      flexAlign,
      flexJustify,
      border,
      tight,
      extraTight,
      children,
      customStyles,
      background
    } = this.props;

    if ((width !== undefined && width < 4) || (height !== undefined && height < 4)) {
      return null
    }

    const flexClasses = {
      'horizontal': styles.horizontalFlex,
      'vertical': styles.verticalFlex
    };

    const flexClass = flex ? flexClasses[flex] : null;

    const colors = Array.isArray(background) ? background : {
      darkGrey: ['#606060BF', '#F7F6F6'],
      lightGrey: ['#BBBBBB', '#232323'],
      extraLightGrey: ['#f7f6f6', '#232323'],
      red: ['#FF5555', '#F7F6F6'],
      blue: ['#3264FF', '#F7F6F6']
    }[background!];

    return (
      <div className={classnames(styles.panel, flexClass, tight ? styles.tightEdges : (extraTight ? styles.extraTightEdges : styles.edges), border ? styles.border : styles.noBorder)}
        style={{
          width: width ? `${width - (1.3 * 2)}vw` : undefined,
          height: height ? `${height - (Panel.marginHeight * 2)}vh` : undefined,
          alignItems: flexAlign,
          justifyContent: flexJustify,
          background: colors[0],
          color: colors[1],
          ...customStyles
        }}>
        {children}
      </div>
    )
  }
}
