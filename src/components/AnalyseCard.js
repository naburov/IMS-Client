import React from 'react';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


export class AnalyseCard extends React.Component {
    render() {
        console.log(this.props.imageString)
        return (
            <Card variant="outlined" style={{ marginTop: '10px', backgroundColor: '#282740'}}>
                <CardContent>
                    <Typography style={{color: '#fff'}}>
                        {'Номер слайса:' +
                            this.props.frameNumber}
                    </Typography>
                    <img src={`data:image/png;base64,${this.props.imageString}`} />
                </CardContent>
            </Card>
        )
    }
}