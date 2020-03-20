import React, { Component } from "react";

import XRenderer2D from "ami.js/src/helpers/x/helpers.x.renderer2d"
import * as THREE from 'three'
import XVolume from "ami.js/src/helpers/x/helpers.x.volume"
import WidgetsAnnotation from "ami.js/src/widgets/widgets.annotation";
import WidgetsBiRuler from "ami.js/src/widgets/widgets.biruler";
import WidgetsHandle from "ami.js/src/widgets/widgets.handle";
import WidgetsRuler from "ami.js/src/widgets/widgets.ruler";
import WidgetsVoxelProbe from "ami.js/src/widgets/widgets.voxelProbe";
import ControlsTrackball from "ami.js/src/controls/controls.trackball";
import HelpersStack from "ami.js/src/helpers/helpers.stack";


const Renderer = {
  flexBasis: '33vw',
  flexGrow:'1',  
  flexShrink:'1',
  display: 'block',
  border: '1px solid #FFFFFF',
};

const RendererRow = {
  width: '100%',
  height: '50%',
};

const guiObjects = {
  type: 'Handle',
};


export class SingleDicomCanvas2D extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.orientation = props.orientation;
    this.stack = props.stack;
  }

  componentDidMount() {
    let widgets = []
    // CREATE RENDERER 2D
    const renderer = new XRenderer2D(this.props.orientation + '_renderer', this.props.orientation);
    let stackHelper = new HelpersStack(this.stack._stack);
    renderer._renderer.setClearColor(0x282740)
    renderer.add(stackHelper)
    renderer.animate();

    const threeD = document.getElementById(this.props.orientation + '_renderer')
    threeD.addEventListener('mousemove', function (evt) {
      // if something hovered, exit
      let cursor = 'default';
      for (let widget of widgets) {
        widget.onMove(evt);
        if (widget.hovered) {
          cursor = 'pointer';
        }
      }

      threeD.style.cursor = cursor;
    });
    threeD.addEventListener('mousedown', function (evt) {
      // if something hovered, exit
      for (let widget of widgets) {
        if (widget.hovered) {
          widget.onStart(evt);
          return;
        }
      }

      threeD.style.cursor = 'default';

    })

    var controls = new ControlsTrackball(renderer._camera, threeD);
    controls.rotateSpeed = 1.4;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    renderer._camera.controls = controls;

    let mouse = {
      x: 200,
      y: 200
    };

    // update the raycaster
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, renderer._camera);
    let intersects = raycaster.intersectObject(stackHelper.slice.mesh);

    if (intersects.length <= 0) {
      return;
    }

    let widget = null;
    console.log(this.props.tool)
    switch (this.props.tool) {
      case 'VoxelProbe':
        widget = new WidgetsVoxelProbe(stackHelper.slice.mesh, controls, {
          stack: this.stack,
          worldPosition: intersects[0].point,
        });
        break;
      case 'Ruler':
        widget = new WidgetsRuler(stackHelper.slice.mesh, controls, {
          lps2IJK: this.stack.lps2IJK,
          pixelSpacing: this.stack.frame[stackHelper.index].pixelSpacing,
          ultrasoundRegions: this.stack.frame[stackHelper.index].ultrasoundRegions,
          worldPosition: intersects[0].point,
        });
        break;
      case 'BiRuler':
        widget = new WidgetsBiRuler(stackHelper.slice.mesh, controls, {
          lps2IJK: this.stack.lps2IJK,
          pixelSpacing: this.stack.frame[stackHelper.index].pixelSpacing,
          ultrasoundRegions: this.stack.frame[stackHelper.index].ultrasoundRegions,
          worldPosition: intersects[0].point,
        });
        break;
      case 'Annotation':
        widget = new WidgetsAnnotation(stackHelper.slice.mesh, controls, {
          worldPosition: intersects[0].point,
        });
        break;
      case 'Handle':
      default:
        widget = new WidgetsHandle(stackHelper.slice.mesh, controls, {
          worldPosition: intersects[0].point,
        });
    }
    widgets.push(widget)
    renderer.add(widget);
  }

  render() {
    return (
        <div id={this.props.orientation + '_renderer'} style={Renderer} >
        </div>
    )
  }
}