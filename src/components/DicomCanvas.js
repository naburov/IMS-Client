import React, { Component } from "react";
import { CircularProgress, Container } from '@material-ui/core';
import ReactDOM from "react-dom";
import axios, { post } from 'axios';
import * as THREE from "three"
import * as AMI from "ami.js"
import * as DATGUI from "dat.gui"
import { SingleDicomCanvas2D } from "./SingleDicomCanvas2D";
import XVolume from "ami.js/src/helpers/x/helpers.x.volume"
import { SingleDicomCanvas3D } from "./SingleDicomCanvas3D";

export class DicomCanvas extends Component {
    constructor(props) {
        super(props);
        this.canvases = props.canvases
        this.renderCanvas = this.renderCanvas.bind(this)
        this.state = {
            data: null,
            isLoading: true
        }
    }

    componentDidMount() {
        const xVolume = new XVolume();
        xVolume.file = `http://localhost:8042/instances/${this.props.instanceId}/file`;
        xVolume.progressbarContainer = window.container;
        xVolume.load()
        .then((volume)=>{
            this.setState({
                data:volume,
                isLoading:false
            })
        })
    }

    renderCanvas = (value, key) => {
        if (value == '3d')
            return <SingleDicomCanvas3D key={key} stack={this.state.data}></SingleDicomCanvas3D>
        else 
            return <SingleDicomCanvas2D key={key} orientation={value}
                instanceId={this.props.instanceId} stack={this.state.data}></SingleDicomCanvas2D>
        // else if (value == 'axial')
        //     return <SingleDicomCanvas2D key={key} orientation='axial' 
        //         instanceId={this.props.instanceId} stack={this.state.data}></SingleDicomCanvas2D>
        // else if (value == 'sagittal')
        //     return <SingleDicomCanvas2D key={key} orientation='sagittal'
        //         instanceId={this.props.instanceId} stack={this.state.data}></SingleDicomCanvas2D>
    }


    render() {
        let key = 0;
        return (
            <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
                {this.state.isLoading
                    ? <Container><CircularProgress style={{marginTop:'20%'}}/></Container>
                    : this.canvases.map(item => this.renderCanvas(item, key++))
                }
            </div>
        )
    }
}