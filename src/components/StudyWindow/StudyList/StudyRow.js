import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { DeleteFileThunk } from '../../../store/file/deleteFileThunk';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


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
        this.study = props.study
        this.onDelete = this.onDelete.bind(this)
    }

    renderDate(str) {
        var year = str.slice(0, 4)
        var month = str.slice(4, 6)
        var day = str.slice(6, 8)

        return (new Date(year, month, day))
    }

    onDelete(){
        this.props.deleteStudy(this.props.study.ID)
    }

    render() {
        const classes = style;

        return (
            <div style={{ paddingTop: '10px' }}>
                {
                    <div style={{ textAlign: 'initial' }}>
                        <Card className={classes.card} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {this.study.PatientMainDicomTags.PatientID}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {this.study.PatientMainDicomTags.PatientName}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Дата исследования: {this.renderDate(this.study.MainDicomTags.StudyDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Пол пациента: {this.study.PatientMainDicomTags.PatientSex == "M"
                                        ? "мужской"
                                        : "женский"}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Дата рождения пациента: {this.renderDate(this.study.PatientMainDicomTags.PatientBirthDate).toLocaleDateString()}
                                </Typography>
                                <br></br>
                                <Typography className={classes.pos} color="textSecondary">
                                    StudyInstanceUID: {this.study.MainDicomTags.StudyInstanceUID}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Series: {this.study.Series}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={{ pathname: `/study/${this.study.ID}/series/${this.study.Series[0]}` }} style={{ textDecoration: 'none' }}>
                                    <Button variant="outlined" color="primary">
                                        Перейти к снимку</Button>
                                </Link>
                                <Button color="secondary" variant="outlined" onClick={this.onDelete}>Удалить</Button>
                            </CardActions>
                        </Card>
                    </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteStudy: (id) => DeleteFileThunk(id)
}, dispatch)

const StudyRow = withStyles(style)(StudyRowComp)
export default connect(null, mapDispatchToProps)(StudyRow)