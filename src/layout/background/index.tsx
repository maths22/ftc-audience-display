import * as React from 'react'

import styles from './styles.module.css'
import backgroundImage from './background.jpg'

export default class Background extends React.Component {
  render() {
    return (
      <div className={styles.background} style={{backgroundImage: `url(${backgroundImage})`}} />
    )
  }
}
