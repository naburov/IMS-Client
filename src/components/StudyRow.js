import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'


const style = (theme) => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export class StudyRowComp extends React.Component {
    constructor(props) {
        super(props)

        this.studyID = props.studyID;
        this.storageUrl = props.storageUrl;

        this.state = {
            id: props.id,
            study: {},
            isLoading: true,
            instanceId: ""
        }
    }

    componentWillMount() {
        var reqId = this.props.storageUrl + '/studies/' + this.studyID;

        fetch(reqId)
            .then(responce => responce.json())
            .then(data => {
                this.setState({
                    study: data,
                    isLoading: false
                })
            })
            .then(data => {
                fetch(this.props.storageUrl + '/series/' + this.state.study.Series[0])
                    .then(responce => responce.json())
                    .then(data => {
                        this.setState({
                            instanceId: data.Instances[0]
                        })
                    })
            })
    }

    renderDate(str) {
        var year = str.slice(0, 4)
        var month = str.slice(4, 6)
        var day = str.slice(6, 8)

        return (new Date(year, month, day))
    }

    render() {
        const classes = style;

        return (
            <div style={{ paddingTop: '10px' }}>
                {
                    this.state.isLoading
                        ? <div>Loading</div>
                        : <div style={{ textAlign: 'initial' }}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {this.state.study.PatientMainDicomTags.PatientID}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {this.state.study.PatientMainDicomTags.PatientName}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Дата исследования: {this.renderDate(this.state.study.MainDicomTags.StudyDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Пол пациента: {this.state.study.PatientMainDicomTags.PatientSex == "M"
                                            ? "мужской"
                                            : "женский"}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Дата рождения пациента: {this.renderDate(this.state.study.PatientMainDicomTags.PatientBirthDate).toLocaleDateString()}
                                    </Typography>
                                    <br></br>
                                    <Typography className={classes.pos} color="textSecondary">
                                        StudyInstanceUID: {this.state.study.MainDicomTags.StudyInstanceUID}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Series: {this.state.study.Series}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={{ pathname: `/study/${this.state.instanceId}` }} style={{textDecoration:'none'}}>
                                        <Button>
                                            Перейти к снимку</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </div>
                }
            </div>
        )
    }
}

const StudyRow = withStyles(style)(StudyRowComp)
export default StudyRow; 