import React, { Component } from "react";

import XRenderer3D from "ami.js/src/helpers/x/helpers.x.renderer3d"
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


export class SingleDicomCanvas3D extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.orientation = props.orientation;
    this.stack = props.stack;
  }

  componentDidMount() {
    // CREATE RENDERER 2D
    const renderer = new XRenderer3D('3d_renderer');
    renderer._renderer.setClearColor(0x282740)
    renderer.animate();
  }


  render() {
    return (
      <div id={'3d_renderer'} style={Renderer}>
      </div>
    )
  }
}