import React from 'react';
import { Grid } from '@material-ui/core';
import { DicomCanvasQuad } from './DicomCanvas-2'
import { ControlPanel } from './ControlPanel'
import {SingleDicomCanvas2D} from './SingleDicomCanvas2D'
import {DicomCanvas} from './DicomCanvas'

const FullScreen = {
    width: '100vw',
    height: '100vh',
};

const Canvases = ['coronal', 'sagittal', 'axial', '3d']


export class MainWindow extends React.Component {

    render() {
        const { instanceId } = this.props.match.params;
        return (
            <Grid style={FullScreen}>
                <Grid item xs={12} style={{ height: '12%' }}>
                    <ControlPanel></ControlPanel>
                </Grid>
                <Grid item xs={12} style={{ height: '88%' }}>
                    {/* <DicomCanvasQuad instanceId={instanceId}></DicomCanvasQuad>*/}   
                    {/* <SingleDicomCanvas2D instanceId={instanceId} orientation="axial"></SingleDicomCanvas2D> */}
                    <DicomCanvas canvases={Canvases} instanceId={instanceId}></DicomCanvas>
                </Grid>
            </Grid>
        )
    }
}