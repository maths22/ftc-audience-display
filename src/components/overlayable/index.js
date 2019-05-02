import React, { Component } from 'react'

export default function overlayable(FullComponent, OverlayComponent) {
  return class extends Component {
    render() {
      return <div style={{'--key-color': this.props.keyColor || '#00ff00'}}>
        {this.props.overlayEnabled ? <OverlayComponent {...this.props} /> : <FullComponent {...this.props} />}
      </div>;
    }
  };
}
