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
  flexGrow: '1',
  flexBasis: '0',
  display: 'block',
  border: '1px solid #FFFFFF',
  width: '100%',
  height: '100%',
  minWidth: '10%',
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
    this.analyseState = props.analyseState

    this.onWidgetMouseMove = this.onWidgetMouseMove.bind(this)
    this.onWidgetMouseUp = this.onWidgetMouseUp.bind(this)
    this.onWidgetMouseDown = this.onWidgetMouseDown.bind(this)
    this.addRTStruct = this.addRTStruct.bind(this)

    this.state = {
      renderer: null,
      widgets: [],
      stackHelper: null,
      controls: null,
    }
  }

  componentDidMount() {

    const threeD = document.getElementById(this.props.orientation + '_renderer')

    console.log(this.props)
    // CREATE RENDERER 2D
    const renderer = new XRenderer2D(this.props.orientation + '_renderer', this.props.orientation);

    let stackHelper = new HelpersStack(this.stack._stack);
    renderer._renderer.setClearColor(0x282740)
    renderer.add(stackHelper)
    renderer.animate();

    renderer._renderer.setSize(threeD.offsetWidth, threeD.offsetHeight);
    renderer._renderer.setPixelRatio(window.devicePixelRatio);


    let controls = new ControlsTrackball(renderer._camera, threeD);
    controls.rotateSpeed = 1.4;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    if (this.props.analyseState == 'ANALYSED')
      this.addRTStruct(renderer)

    this.setState({
      renderer: renderer,
      stackHelper: stackHelper,
      controls: controls
    })
  }

  onWidgetMouseUp(evt) {
    console.log('Up')
    for (let widget of this.state.widgets) {
      if (widget.active) {
        widget.onEnd(evt);
        return;
      }
    }
  }

  onWidgetMouseMove(evt) {
    const threeD = document.getElementById(this.props.orientation + '_renderer')

    try {
      let cursor = 'default';
      for (let widget of this.state.widgets) {
        widget.onMove(evt);
        if (widget.hovered) {
          cursor = 'pointer';
        }
      }

      threeD.style.cursor = cursor;
    }
    catch (e) {

    }
  }

  onWidgetMouseDown(evt) {
    if (evt.altKey) {
      for (let widget of this.state.widgets) {
        if (widget.hovered) {
          widget.free();
          console.log(this.state.widgets.length)
          var new_widgets = this.state.widgets.filter(function (el) {
            return el._container != null;
          });
          this.setState({
            widgets: new_widgets
          })
          return;
        }
      }
    } else {

      console.log('Pressed')

      try {
        // if something hovered, exit
        for (let widget of this.state.widgets) {
          if (widget != null)
            if (widget.hovered) {
              widget.onStart(evt);
              return;
            }
        }
      } catch (e) {

      }

      const threeD = document.getElementById(this.props.orientation + '_renderer')
      const box = threeD.getBoundingClientRect();
      const docEl = document.documentElement;

      const scrollTop = window.pageYOffset || docEl.scrollTop || document.body.scrollTop;
      const scrollLeft =
        window.pageXOffset || docEl.scrollLeft || document.body.scrollLeft;

      const clientTop = docEl.clientTop || document.body.clientTop || 0;
      const clientLeft = docEl.clientLeft || document.body.clientLeft || 0;

      const top = box.top + scrollTop - clientTop;
      const left = box.left + scrollLeft - clientLeft;

      let offsets = {
        top: Math.round(top),
        left: Math.round(left),
      };


      threeD.style.cursor = 'default'

      let mouse = {
        x: (evt.clientX - offsets.left) / threeD.offsetWidth * 2 - 1,
        y: -(evt.clientY - offsets.top) / threeD.offsetHeight * 2 + 1,
      };

      // update the raycaster
      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.state.renderer._camera);
      let intersects = raycaster.intersectObject(this.state.stackHelper.slice.mesh);

      if (intersects.length <= 0) {
        return;
      }
      console.log(intersects.name)

      let widget = null;

      switch (this.props.tool) {
        case 'Handle':
          widget =
            new WidgetsHandle(this.state.stackHelper.slice.mesh, this.state.controls,
              this.state.renderer._camera, threeD);
          widget.worldPosition = intersects[0].point;
          break;
        case 'Ruler':
          console.log('Using Ruler')
          widget =
            new WidgetsRuler(this.state.stackHelper.slice.mesh,
              this.state.controls, this.state.renderer._camera, threeD);
          widget.worldPosition = intersects[0].point;
          break;
        case 'VoxelProbe':
          widget =
            new WidgetsVoxelProbe(
              this.props.stack._stack, this.state.stackHelper.slice.mesh,
              this.state.controls, this.state.renderer._camera, threeD);
          widget.worldPosition = intersects[0].point;
          break;
        case 'Annotation':
          widget =
            new WidgetsAnnotation(this.statestackHelper.slice.mesh,
              this.state.controls, this.state.renderer._camera, threeD);
          widget.worldPosition = intersects[0].point;
          break;
        default:
          console.log('Using default')
          break;
      }
      if (widget != null) {
        this.state.widgets.push(widget)
        this.state.renderer._scene.add(widget)
      }
    }
  }

  addRTStruct(renderer) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    // renderer._scene.add(cube);
    console.log(renderer)
  }

  render() {
    return (
      <div id={this.props.orientation + '_renderer'}
        onMouseMove={(e) => this.onWidgetMouseMove(e)}
        onMouseUp={(e) => this.onWidgetMouseUp(e)}
        onClick={(e) => this.onWidgetMouseDown(e)}
        style={Renderer}>
      </div>
    )
  }
}