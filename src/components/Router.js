import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {MainWindow} from './MainWindow'
import { StudyWindow } from './StudyWindow/StudyWindow';

export class Router extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={StudyWindow} />
                <Route name="study" path='/study/:seriesId' component={MainWindow} />
            </Switch>
        )
    }
}