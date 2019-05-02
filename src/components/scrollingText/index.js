import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class ScrollingText extends Component {
  static propTypes = {
    width: PropTypes.string,
    text: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.spanRef = React.createRef();
    this.state = {tooWide: false};
  }

  componentDidMount() {
    this.updateTooWide();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.text !== this.props.text) {
      this.updateTooWide();
    }
  }

  updateTooWide() {
    const el = this.spanRef.current;
    this.setState({tooWide: el.scrollWidth > el.clientWidth})
  }

  calcSpeed() {
    const el = this.spanRef.current;
    return el.scrollWidth / document.documentElement.clientWidth * 50; // Want constant ips (e.g rate * length)
  }

  render() {
    const {
      width,
      text
    } = this.props

    return this.state.tooWide ?
      <div style={{width: width}} className={styles.wrapperDiv}>
        <span
          style={{animation: `${styles.textScroll} ${this.calcSpeed()}s linear infinite`}}
          className={styles.span}>
          {text}<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{text}<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </span>
        <span
          style={{width: width, overflow: 'hidden', position: 'absolute', left: '-100vh', top: '-100vh'}}
          ref={this.spanRef}
          className={styles.span}>
          {text}
        </span>
      </div>
      : <span
        style={{width: width, overflow: 'hidden'}}
        ref={this.spanRef}
        className={styles.span}>
        {text}
      </span>
  }
}
