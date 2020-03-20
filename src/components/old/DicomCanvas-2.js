import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import * as THREE from 'three'

import XRenderer2D from "ami.js/src/helpers/x/helpers.x.renderer2d"
import XRenderer3D from "ami.js/src/helpers/x/helpers.x.renderer3d"
import XMesh from "ami.js/src/helpers/x/helpers.x.mesh"
import XVolume from "ami.js/src/helpers/x/helpers.x.volume"

import HelpersBoundingBox from 'ami.js/src/helpers/helpers.boundingbox';
import * as DATGUI from "dat.gui"


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



export class DicomCanvasQuad extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.guiRef = React.createRef();

    this.state = {
      scene: null,
      file: null,
      camera: null,
    }
  }

  componentDidMount() {
    // CREATE RENDERER 3D
    const renderer0 = new XRenderer3D('r0');
    renderer0._renderer.setClearColor(0x282740)
    renderer0.animate();

    // CREATE RENDERER 2D
    const renderer1 = new XRenderer2D('r1', 'sagittal');
    renderer1._renderer.setClearColor(0x282740)
    renderer1.animate();

    // CREATE RENDERER 2D
    const renderer2 = new XRenderer2D('r2', 'axial');
    renderer2._renderer.setClearColor(0x282740)
    renderer2.animate();

    // CREATE RENDERER 2D
    const renderer3 = new XRenderer2D('r3', 'coronal');
    renderer3._renderer.setClearColor(0x282740)
    renderer3.animate();

    // CREATE THE 3D VOLUME
    const xVolume = new XVolume();
    xVolume.file = `http://localhost:8042/instances/${this.props.instanceId}/file`;
    xVolume.progressbarContainer = renderer0.container;

    xVolume
      .load()
      .then((volume) => {

        var mesh = new XMesh();
        mesh.materialColor = 0xffffff;

        // white BBox
        let box = new HelpersBoundingBox(volume.stack);
        renderer0.add(box);
        renderer0.center(volume.centerLPS);

        // sagittal view
        volume._xSlice.bbox.visible = false;
        volume._xSlice.borderColor = 0xf44336;
        renderer1.add(volume._xSlice);
        renderer0.add(renderer1._scene);

        // axial view
        volume._ySlice.bbox.visible = false;
        volume._ySlice.borderColor = 0xffeb3b;
        renderer2.add(volume._ySlice);
        renderer0.add(renderer2._scene);

        // coronal view
        volume._zSlice.bbox.visible = false;
        volume._zSlice.borderColor = 0x8bc34a;
        renderer3.add(volume._zSlice);
        renderer0.add(renderer3._scene);

        // gui(volume, this.guiRef);
      })
      .catch(error => {
        window.console.log('oops... something went wrong...');
        window.console.log(error);
      });

    function gui(volume, guiRef) {
      var gui = new DATGUI.GUI({
        autoPlace: false,
      });

      var customContainer = guiRef
      customContainer.appendChild(gui.domElement);

      let stackFolder1 = gui.addFolder('Sagittal');
      stackFolder1
        .add(volume._xSlice, 'index', 0, volume._xSlice.orientationMaxIndex)
        .step(1)
        .listen();
      volume._xSlice.index = Math.floor(volume._xSlice.orientationMaxIndex / 2);

      let stackFolder2 = gui.addFolder('Axial');
      stackFolder2
        .add(volume._ySlice, 'index', 0, volume._ySlice.orientationMaxIndex)
        .step(1)
        .listen();
      volume._ySlice.index = Math.floor(volume._ySlice.orientationMaxIndex / 2);

      let stackFolder3 = gui.addFolder('Coronal');
      stackFolder3
        .add(volume._zSlice, 'index', 0, volume._zSlice.orientationMaxIndex)
        .step(1)
        .listen();
      volume._zSlice.index = Math.floor(volume._zSlice.orientationMaxIndex / 2);
    };
  }

  loadFile(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    alert(xhr.response)
  }


  render() {
    return (
      <div style={{
        display: 'flex', width: '100%', height: '100%',
      }}>
        <div style={RendererRow}>
          <div id='r0'
            style={Renderer}>
          </div>
          <div id='r1'
            style={Renderer}>
          </div>
        </div>
        <div style={RendererRow}>
          <div id='r2'
            style={Renderer}>
          </div>
          <div id='r3'
            style={Renderer}>
          </div>
        </div>
        <div style={{ position: "fixed", top: '10px', right: '10px' }} ref={ref => (this.guiRef = ref)}></div>
      </div>
    )
  }
}