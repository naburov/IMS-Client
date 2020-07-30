import React, { Component } from "react";

import XRenderer3D from "ami.js/src/helpers/x/helpers.x.renderer3d";

const Renderer = {
  width:'100%',
  height:'100%',
  display: 'block',
  border: '1px solid #FFFFFF'
};


export class SingleDicomCanvas3D extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.orientation = props.orientation;
    this.stack = props.stack;
  }

  componentDidMount() {
    const renderer = new XRenderer3D('3d_renderer');
    renderer._renderer.setClearColor(0x282740)
    renderer.animate()

    console.log(this.stack._stack)

    renderer.add(this.stack._zSlice);
    renderer.add(this.stack._ySlice);
    renderer.add(this.stack._xSlice);
    
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div id='my-lut-canvases' style={{position:'absolute', right:'32%', zIndex:'10'}} />
        <div id="3d_renderer" style={Renderer}/>
      </div>
    )
  }
}