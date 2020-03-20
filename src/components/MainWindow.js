import React from 'react';
import { Grid } from '@material-ui/core';
import ControlPanel from './ControlPanel'
import DicomCanvasContainer from './DicomCanvas/DicomCanvasContainer'

const FullScreen = {
    width: '100vw',
    height: '100vh',
};



export class MainWindow extends React.Component {

    render() {
        const { seriesId } = this.props.match.params;
        return (
            <Grid style={FullScreen}>
                <Grid item xs={12} style={{ height: '12%' }}>
                    <ControlPanel></ControlPanel>
                </Grid>
                <Grid item xs={12} style={{ height: '88%' }}>
                    {/* <DicomCanvasQuad instanceId={instanceId}></DicomCanvasQuad>*/}   
                    {/* <SingleDicomCanvas2D instanceId={instanceId} orientation="axial"></SingleDicomCanvas2D> */}
                    {/* <DicomCanvas canvases={Canvases} seriesId={seriesId}></DicomCanvas> */}
                    <DicomCanvasContainer seriesId={seriesId}></DicomCanvasContainer>
                </Grid>
            </Grid>
        )
    }
}