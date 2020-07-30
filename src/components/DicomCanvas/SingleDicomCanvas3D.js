import React, { Component } from "react";


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