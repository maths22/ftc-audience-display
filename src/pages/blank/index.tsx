import * as React from 'react'
import overlayable  from '../../components/overlayable'
import BlankOverlay from './overlay'
import Blank from './full'
import { Props } from './types'

export { React }

export default overlayable<Props>(Blank, BlankOverlay)
