import React from 'react';
import { StudyList } from './StudyList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchStudyListThunk } from '../../../store/file/fetchStudyList'
import { getStudyList, getStudyListError, getStudyListPending } from '../../../store/file/reducers'
import { CircularProgress } from '@material-ui/core'

export class StudyListContainer extends React.Component {

    componentDidMount() {
        const { fetchStudies } = this.props
        fetchStudies();
        console.log("done")
    }


    render() {
        const { studies, error, pending } = this.props
        if (pending || studies == undefined) return <CircularProgress style={{ marginTop: '20%' }} ></CircularProgress>
        else return <StudyList studies={studies}></StudyList>
    }
}

function mapStateToProps(state) {
    return {
        error: getStudyListError(state),
        studies: getStudyList(state),
        pending: getStudyListPending(state)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchStudies: fetchStudyListThunk
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StudyListContainer)