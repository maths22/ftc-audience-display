import React, { Component } from 'react'

import styles from './styles.css'

import Input from '../../components/input'
import Panel from '../../layout/panel'
import Heading from '../../components/heading'
import ColorPicker from '../colorPicker'
import Select from '../../components/select'
import SoundTest from '../soundTest'
import Text from '../../components/text'
import Settings, {defaultSettings} from '../settings'
import Button from '../../components/button'

export default class SettingsDialog extends Component {
  constructor(props) {
    super(props)
    this.timeout = null;
    this.state = {
      showButton: false,
      showDialog: false
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.mouseMoveListener)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mouseMoveListener)
  }

  mouseMoveListener = () => {
    if(!this.state.showButton) {
      this.setState({showButton: true})
    }

    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.hideButton, 1000);
  }

  hideButton = () => {
    this.setState({showButton: false});
  }

  showDialog = () => {
    this.setState({showDialog: true, oldSettings: this.props.settings});
  }

  hideDialog = () => {
    this.setState({showDialog: false})
    this.props.updateSettings(this.props.settings || defaultSettings)
  }

  cancelDialog = () => {
    this.setState({showDialog: false})
    this.props.updateSettings(this.state.oldSettings || defaultSettings)
  }

  updateSettings = (settings) => {
    this.setState({showDialog: true})
    this.props.updateSettings(settings)
  }

  render() {
    const shouldShowDialog = this.state.showDialog || !this.props.settings;
    return [
      <button key={'button'} className={styles.button + ' ' + (this.state.showButton ? styles.buttonIn : '')} onClick={this.showDialog}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/></svg></button>,
      shouldShowDialog ? <div className={styles.dialog} key={'dialog'}>
        <Settings settings={this.props.settings || defaultSettings} updateSettings={this.updateSettings}/>

        <Button onClick={this.hideDialog}>Save</Button>
        <Button onClick={this.cancelDialog}>Cancel</Button>
      </div> : null
     ] // shouldShowDialog ? <div className={styles.modalOverlay} key={'overlay'}></div> : nul
  }
}
