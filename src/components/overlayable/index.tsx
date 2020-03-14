import * as React from 'react'
import {BaseProps} from "../../baseProps";

export default function overlayable<P extends BaseProps>(FullComponent : React.ComponentType<P>, OverlayComponent : React.ComponentType<P>) {
  return class extends React.Component<P> {
    render() {
      return <div style={{'--key-color': this.props.keyColor || '#00ff00'} as React.CSSProperties}>
        {this.props.overlayEnabled ? <OverlayComponent {...this.props} /> : <FullComponent {...this.props} />}
      </div>
    }
  }
}
