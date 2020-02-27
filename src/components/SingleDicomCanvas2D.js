import React, { Component } from "react";

import XRenderer2D from "ami.js/src/helpers/x/helpers.x.renderer2d"
import * as THREE from 'three'
import XVolume from "ami.js/src/helpers/x/helpers.x.volume"


const Renderer = {
  width: '100%',
  height: '100%',
  display: 'block',
  border: '1px solid #FFFFFF'
};

const RendererRow = {
  width: '100%',
  height: '50%',
};



export class SingleDicomCanvas2D extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.orientation = props.orientation;
    this.stack = props.stack;
  }

  componentDidMount() {
    // CREATE RENDERER 2D
    const renderer = new XRenderer2D(this.props.orientation + '_renderer', this.props.orientation);
    renderer._renderer.setClearColor(0x282740)
    renderer.animate();

    switch (this.props.orientation) {
      case 'coronal':
        renderer.add(this.stack._zSlice);
        break;
      case 'axial':
        renderer.add(this.stack._ySlice);
        break;
      default:
        renderer.add(this.stack._xSlice);
        break;
    }
  }

  render() {
    return (
      <div id={this.props.orientation + '_renderer'} style={Renderer}>
      </div>
    )
  }
}