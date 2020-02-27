import React from 'react';
import {
    Grid, Button, ButtonGroup, IconButton,
    Link, List, ListItem,
    ListItemIcon, ListItemText,
    Toolbar, AppBar, Typography, Drawer
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CompareOutlinedIcon from '@material-ui/icons/CompareOutlined';
import ZoomOutMapOutlinedIcon from '@material-ui/icons/ZoomOutMapOutlined';
import SpaceBarOutlinedIcon from '@material-ui/icons/SpaceBarOutlined';
import SquareFootOutlinedIcon from '@material-ui/icons/SquareFootOutlined';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import {SidePanel} from './SidePanel'

const FullScreen = {
    width: '100vw',
    height: '100vh',
};

const SquareButton = {
    maxWidth: '30px',
    maxHeight: '30px'
}

export class ControlPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = { panelOpened: false }
        this.handleOpen = this.handleOpen.bind(this)
    }

    handleOpen() {
        this.setState({
            panelOpened: !this.state.panelOpened
        })
    }

    render() {
        return (
            <div>
                <AppBar style={{ background: 'white', height: '12%', position: 'absolute', zIndex: 1500 }}>
                    <Grid container style={{ flexFrow: 1 }}>
                        <Grid item xs={4} >
                            <ButtonGroup style={{ marginTop: '15px' }} variant="contained"
                                color="primary" aria-label="contained primary button group" >
                                <IconButton size="medium" color="primary" component={Link} href='/'>
                                    <FileCopyOutlinedIcon></FileCopyOutlinedIcon>
                                </IconButton>
                            </ButtonGroup>
                        </Grid >
                        <Grid item xs={4}>
                            <ButtonGroup style={{ marginTop: '15px' }}
                                variant="contained" color="primary" aria-label="contained primary button group" >
                                <IconButton size="medium" color="primary" >
                                    <SpaceBarOutlinedIcon></SpaceBarOutlinedIcon>
                                </IconButton>
                                <IconButton size="medium" color="primary" >
                                    <ZoomOutMapOutlinedIcon></ZoomOutMapOutlinedIcon>
                                </IconButton>
                                <IconButton size="medium" color="primary" >
                                    <CompareOutlinedIcon></CompareOutlinedIcon>
                                </IconButton>
                                <IconButton size="medium" color="primary" >
                                    <SquareFootOutlinedIcon></SquareFootOutlinedIcon>
                                </IconButton>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={4} >
                            <ButtonGroup style={{ marginTop: '15px' }}
                                variant="contained" color="primary" aria-label="contained primary button group" >
                                <IconButton
                                    color="Primary"
                                    aria-label="open drawer"
                                    onClick={this.handleOpen}
                                >
                                    <MenuIcon />
                                </IconButton>
                                {/* <Button>7</Button>
                            <Button>8</Button>
                            <Button>9</Button>
                            <Button>10</Button> */}
                            </ButtonGroup>
                        </Grid>
                    </Grid >
                </AppBar>
                <Drawer variant="permanent" anchor='right' >
                    {this.state.panelOpened
                        ? <SidePanel></SidePanel>
                        : <div></div>
                    }
                </Drawer>
            </div>
        )
    }
}