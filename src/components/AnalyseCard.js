import React from 'react';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


export class AnalyseCard extends React.Component {
    render() {
        console.log(this.props.data)
        if (this.props.dataKey.includes("sagittal") || this.props.dataKey.includes("septum") || this.props.dataKey.includes("image"))
            return (
                <Card variant="outlined" style={{ marginTop: '10px', backgroundColor: '#282740' }}>
                    <CardContent>
                        <Typography style={{ color: '#fff' }}>
                            {'Номер слайса:' +
                                this.props.dataKey}
                        </Typography>
                        <img src={`data:image/png;base64,${this.props.data}`} width='256' height='256'/>
                    </CardContent>
                </Card>
            )
        else
            return (
                <Card variant="outlined" style={{ marginTop: '10px', backgroundColor: '#282740' }}>
                    <CardContent>
                        <Typography style={{ color: '#fff' }}>
                            {'Отклонение:' +
                                this.props.data}
                        </Typography>
                    </CardContent>
                </Card>
            )
    }
}