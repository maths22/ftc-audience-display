import * as React from 'react'

import Background from '../background'
import Panel from '../panel'

import styles from './styles.module.css'

import 'typeface-allerta'
import FtcLogo from './ftc-logo.png'
import SeasonLogo from './season-logo.png'
import {FlexProperty} from "csstype";

type Props = {
  heading: React.ReactNode,
  footer: React.ReactNode,
  bodyFlex: FlexProperty<string>
}

export default class PrimaryLayout extends React.Component<Props> {
  render() {
    const {
      heading,
      children,
      footer,
      bodyFlex
    } = this.props;

    return [
      <Background key={0} />,
      <div className={styles.main} key={1}>
        <Panel height={14 + Panel.marginHeight} width={100} flex='horizontal' flexAlign={'center'}>
          {heading}
        </Panel>
        <Panel height={69} width={100} flex={bodyFlex}>
          {children}
        </Panel>
        <Panel height={17 + Panel.marginHeight} width={100} flex='horizontal' flexAlign={'center'}>
          <img src={FtcLogo} style={{height: 'calc(100% - 0.5vmin)', margin: '0.5vmin'}} alt="FTC Program Logo"/>
          <div className={styles.centeredContainer}>
            {footer}
          </div>
          <img src={SeasonLogo} style={{height: 'calc(100% - 0.5vmin)', margin: '0.5vmin'}} alt="Season Logo" />
        </Panel>
      </div>
    ]
  }
}
