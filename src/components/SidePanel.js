import React from 'react';
import { CircularProgress, Container } from '@material-ui/core';


const PanelStyle = {
    width: '400px',
    height: '100%'
}

export class SidePanel extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            isAnalysing: false,
            isAnalysed: false
        }
    }



    render(){
        return (
            <div style={{marginTop:'120px'}}>
                <Container style={{width:'400px'}}><CircularProgress /></Container>
            </div>
        )
    }
}