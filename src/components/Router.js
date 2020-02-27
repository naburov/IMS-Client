import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DicomCanvasQuad } from './DicomCanvas-2';
import { StudyList } from './StudyList';
import {MainWindow} from './MainWindow'

export class Router extends React.Component {

    render() {
        const WrappedStudyList = function (props) {
            return <StudyList {...props} storageUrl="http://localhost:8042" />
        }


        return (
            <Switch>
                <Route exact path='/' component={WrappedStudyList} />
                {/* <Route name="study" path='/study/:instanceId' component={DicomCanvasQuad} /> */}
                <Route name="study" path='/study/:instanceId' component={MainWindow} />
            </Switch>
        )
    }
}