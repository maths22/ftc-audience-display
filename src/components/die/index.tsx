import * as React from 'react'

import styles from './styles.module.css'

type Props = {
  number: number
}

export default class Die extends React.Component<Props> {

  renderCenterPip() {
    return <div className={styles.pip} style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, marginTop: 'auto', marginBottom: 'auto', top: 0, bottom: 0 }} />
  }

  renderCenterLeftPip() {
    return <div className={styles.pip} style={{ position: 'absolute', left: '3em', marginTop: 'auto', marginBottom: 'auto', top: 0, bottom: 0 }} />
  }

  renderCenterRightPip() {
    return <div className={styles.pip} style={{ position: 'absolute', right: '3em', marginTop: 'auto', marginBottom: 'auto', top: 0, bottom: 0 }} />
  }

  renderUpperRightPip(isSix : boolean) {
    return <div className={styles.pip} style={{ position: 'absolute', right: isSix ? '3em' : '2em', top: '2em' }} />
  }

  renderUpperLeftPip(isSix : boolean) {
    return <div className={styles.pip} style={{ position: 'absolute', left: isSix ? '3em' : '2em', top: '2em' }} />
  }

  renderBottomRightPip(isSix : boolean) {
    return <div className={styles.pip} style={{ position: 'absolute', right: isSix ? '3em' : '2em', bottom: '2em' }} />
  }

  renderBottomLeftPip(isSix : boolean) {
    return <div className={styles.pip} style={{ position: 'absolute', left: isSix ? '3em' : '2em', bottom: '2em' }} />
  }

  render() {
    return (
      <div className={styles.die} style={{position: 'relative'}}>
        {[1, 3, 5].includes(this.props.number) ? this.renderCenterPip() : null}
        {[2, 3, 4, 5, 6].includes(this.props.number) ? this.renderUpperRightPip(this.props.number === 6) : null}
        {[4, 5, 6].includes(this.props.number) ? this.renderUpperLeftPip(this.props.number === 6) : null}
        {[4, 5, 6].includes(this.props.number) ? this.renderBottomRightPip(this.props.number === 6) : null}
        {[2, 3, 4, 5, 6].includes(this.props.number) ? this.renderBottomLeftPip(this.props.number === 6) : null}
        {[6].includes(this.props.number) ? this.renderCenterLeftPip() : null}
        {[6].includes(this.props.number) ? this.renderCenterRightPip() : null}
      </div>
    )
  }
}
