import React from 'react';
import StudyRow from './StudyList/StudyRow';
import StudyListContainer from './StudyList/StudyListContainer'
import UploadFilesContainer from './UploadFileContainer'


export class StudyWindow extends React.Component {
    render() {

        return (
            <div>
                <UploadFilesContainer></UploadFilesContainer>
                <StudyListContainer></StudyListContainer>
            </div>
        )
    }
}