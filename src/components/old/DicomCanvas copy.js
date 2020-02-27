import React, { Component } from "react";
import ReactDOM from "react-dom";
import { colors, file } from './utils'
import axios, { post } from 'axios';
import * as THREE from "three"
import * as AMI from "ami.js"
import * as DATGUI from "dat.gui"

export class DicomCanvas extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.guiRef = React.createRef();
    }

    componentDidMount() {
        const { instanceId } = this.props.match.params;
        var file = `http://localhost:8042/instances/${instanceId}/file`;

        var container = this.canvasRef;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            45,
            container.offsetWidth / container.offsetHeight,
            0.1,
            1000
        );

        camera.position.x = 150;
        camera.position.y = 150;
        camera.position.z = 100;

        var renderer = new THREE.WebGLRenderer();
        var controls = new AMI.TrackballControl(camera, container);

        renderer.setSize(container.innerWidth, container.innerHeight);
        renderer.setClearColor(colors.darkGrey, 1);
        renderer.setPixelRatio(container.devicePixelRatio);
        container.appendChild(renderer.domElement);

        function onWindowResize() {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        };

        container.addEventListener('resize', onWindowResize, false);

        var loader = new AMI.VolumeLoader(container);
        loader.file = file;

        loader
            .load("http://localhost:3000/study/5b271e9f-c5e95a0d-c5d4e34a-cf0cd1d8-04526779")
            .then(() => {
                const series = loader.data[0].mergeSeries(loader.data);
                const stack = series[0].stack[0];
                loader.free();

                const stackHelper = new AMI.StackHelper(stack);
                stackHelper.bbox.color = colors.red;
                stackHelper.border.color = colors.blue;

                scene.add(stackHelper);
                gui(stackHelper, this.guiRef);

                // center camera and interactor to center of bouding box
                var centerLPS = stackHelper.stack.worldCenter();
                camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
                camera.updateProjectionMatrix();
                controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
            })
            .catch(error => {
                window.console.log('oops... something went wrong...');
                window.console.log(error);
            });

        var animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
        };

        animate();


        function gui(stackHelper, guiRef) {
            var stack = stackHelper.stack;
            var gui = new DATGUI.GUI({
                autoPlace: false,
            });
            var customContainer = guiRef
            customContainer.appendChild(gui.domElement);

            // stack
            var stackFolder = gui.addFolder('Stack');
            // index range depends on stackHelper orientation.
            var index = stackFolder
                .add(stackHelper, 'index', 0, stack.dimensionsIJK.z - 1)
                .step(1)
                .listen();
            var orientation = stackFolder
                .add(stackHelper, 'orientation', 0, 2)
                .step(1)
                .listen();
            orientation.onChange(value => {
                index.__max = stackHelper.orientationMaxIndex;
                stackHelper.index = Math.floor(index.__max / 2);
            });
            stackFolder.open();

            // slice
            var sliceFolder = gui.addFolder('Slice');
            sliceFolder
                .add(stackHelper.slice, 'windowWidth', 1, stack.minMax[1] - stack.minMax[0])
                .step(1)
                .listen();
            sliceFolder
                .add(stackHelper.slice, 'windowCenter', stack.minMax[0], stack.minMax[1])
                .step(1)
                .listen();
            sliceFolder.add(stackHelper.slice, 'intensityAuto').listen();
            sliceFolder.add(stackHelper.slice, 'invert');
            sliceFolder.open();

            // bbox
            var bboxFolder = gui.addFolder('Bounding Box');
            bboxFolder.add(stackHelper.bbox, 'visible');
            bboxFolder.addColor(stackHelper.bbox, 'color');
            bboxFolder.open();

            // border
            var borderFolder = gui.addFolder('Border');
            borderFolder.add(stackHelper.border, 'visible');
            borderFolder.addColor(stackHelper.border, 'color');
            borderFolder.open();
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
            <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
                <div>
                    <div ref={ref => (this.canvasRef = ref)}
                        style={{ width: '50vw', height: '50vh', display: 'block', border: '1px solid #FFFFFF' }}>
                    </div>
                    <div id='r1'
                        style={{ width: '50vw', height: '50vh', display: 'block', border: '1px solid #FFFFFF' }}>
                    </div>
                </div>
                <div>
                    <div id='r2'
                        style={{ width: '50vw', height: '50vh', display: 'block', border: '1px solid #FFFFFF' }}>
                    </div>
                    <div id='r3'
                        style={{ width: '50vw', height: '50vh', display: 'block', border: '1px solid #FFFFFF' }}>
                    </div>
                </div>
                <div style={{ position: "fixed", top: '10px', right: '10px' }} ref={ref => (this.guiRef = ref)}></div>
            </div>
        )
    }
}