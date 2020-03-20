import React from 'react';
import StudyRow  from './StudyRow';

export class StudyList extends React.Component {
    render() {
        
        return (            
            <div style={{padding:'50px'}}> {this.props.studies.map(item => (
                <StudyRow study={item} ></StudyRow>
            ))}</div>
        )
    }
}