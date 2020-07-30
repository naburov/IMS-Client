import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CircularProgress } from '@material-ui/core'
import { DicomCanvas } from './DicomCanvas'
import {
    getInstanceFile,
    getInstanceFilePending,
    getInstanceFileError,
    getLayout,
    getTool,
    getAnalysePending
} from '../../store/view/reducers';
import {
    getAnalyseState
} from '../../store/analysis/reducers'
import { loadInstanceFileThunk } from '../../store/view/loadFile';
import { checkIsAnalysedThunk } from '../../store/analysis/checkIsAnalysed'

export class DicomCanvasContainer extends React.Component {

    componentDidMount() {
        const {studyId, loadFile, seriesId, checkIsAnalysed } = this.props
        checkIsAnalysed(studyId)
        loadFile(seriesId)
    }


    render() {
        const { instanceFile,
            instanceFilePending,
            instanceFileError,
            tool,
            layout,
            analysePending, 
            analyseState } = this.props
            
        if (instanceFilePending || instanceFile === undefined)
            return <CircularProgress
                style={{ marginTop: '20%' }}></CircularProgress>
        else return <DicomCanvas instanceFile={instanceFile}
            tool={tool}
            layout={layout}
            analyseState={analyseState}></DicomCanvas>
    }
}

function mapStateToProps(state) {
    return {
        instanceFile: getInstanceFile(state),
        instanceFilePending: getInstanceFilePending(state),
        tool: getTool(state),
        instanceFileError: getInstanceFileError(state),
        layout: getLayout(state),
        analyseState: getAnalyseState(state)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    loadFile: (seriesId) => loadInstanceFileThunk(seriesId),
    checkIsAnalysed: (studyId) => checkIsAnalysedThunk(studyId)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DicomCanvasContainer)