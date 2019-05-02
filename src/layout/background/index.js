import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css';
import backgroundImage from './background.jpg';

export default class Background extends Component {

  render() {

    return (
      <div className={styles.background} style={{backgroundImage: `url(${backgroundImage})`}}/>
    )
  }
}
