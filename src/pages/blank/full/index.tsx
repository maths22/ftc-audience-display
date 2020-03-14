import * as React from 'react'

import styles from './styles.module.css'
import {Props} from "../types";

export default class Blank extends React.Component<Props> {
  render() {
    return (
      <div className={styles.blackOverlay} />
    )
  }
}
