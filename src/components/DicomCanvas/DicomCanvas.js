import React, { Component } from "react";
import { SingleDicomCanvas2D } from "./SingleDicomCanvas2D";
import { SingleDicomCanvas3D } from "./SingleDicomCanvas3D";

export class DicomCanvas extends Component {
    constructor(props) {
        super(props);
        this.canvases = props.canvases
        this.renderCanvas = this.renderCanvas.bind(this)
    }

    renderCanvas = (value, key) => {
        console.log(this.props.tool)
        if (value === '3d')
            return <SingleDicomCanvas3D key={key} stack={this.props.instanceFile}></SingleDicomCanvas3D>
        else
            return <SingleDicomCanvas2D key={key} orientation={value} tool={this.props.tool}
                instanceId={this.props.instanceId} stack={this.props.instanceFile}></SingleDicomCanvas2D>
    }

    componentDidMount(){
        window.dispatchEvent(new Event('resize'));
    }

    componentDidUpdate(){        
        window.dispatchEvent(new Event('resize'));
    }

    render() {
        let key = 0;
        var canvases = []
        switch (this.props.layout) {
            case 'MPR':
                canvases = ['coronal', 'axial', 'sagittal']
                return (
                    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
                        {canvases.map(item => this.renderCanvas(item, key++))}
                    </div>
                )
            case '3d':
                canvases = ['3d']
                return (
                    <div style={{ display: 'flex', width: '100vw', height: '100vh'}}>
                        {canvases.map(item => this.renderCanvas(item, key++))}
                    </div>
                )
            default:
                canvases = ['coronal']
                return (
                    <div style={{ display: 'flex', width: '100vw', height: '100vh'}}>
                        {canvases.map(item => this.renderCanvas(item, key++))}
                    </div>
                )

        }
    }
}