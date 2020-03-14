import * as React from 'react'

import styles from './styles.module.css'
import Text from '../text'

type Props = {
  onClick: () => void
}

export default class Button extends React.Component<Props> {
  render() {
    const {
      children,
      onClick
    } = this.props;

    return (
      <button className={styles.button} onClick={onClick}>
        <Text size={24}>{children}</Text>
      </button>
    )
  }
}
