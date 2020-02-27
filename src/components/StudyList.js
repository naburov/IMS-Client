import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StudyRow  from './StudyRow';

export class StudyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            studiesList: [],
            storageUrl: props.storageUrl
        }
    }

    getStudies() {
        var studiesUrl = this.state.storageUrl + '/studies'

        fetch(studiesUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    studiesList: data
                })
            })


    }

    componentDidMount() {
        this.getStudies();
    }


    render() {
        return (
            <div style={{padding:'50px'}}> {this.state.studiesList.map(item => (
                <StudyRow studyID={item} storageUrl={this.state.storageUrl} ></StudyRow>
            ))}</div>
        )
    }
}