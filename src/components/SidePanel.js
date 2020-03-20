import React from 'react';
import { CircularProgress, Container, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAnalysePending, getAnalyseError, getAnalyseResult, getInstanceId, getAnalyseState } from '../store/view/reducers';
import { sendToAnalyseThunk } from '../store/view/sendAnalysing'
import { AnalyseCard } from './AnalyseCard';


const PanelStyle = {
    width: '400px',
    height: '100%'
}

class SidePanel extends React.Component {
    constructor(props) {
        super(props)

        this.sendForAnalysingClick = this.sendForAnalysingClick.bind(this)

    }

    sendForAnalysingClick() {
        console.log("Seding information")
        var projection = 'coronal'
        var url = 'http://storage:8042/instances/'
            + this.props.instanceId + '/file'
        const { sendForAnalysing } = this.props;
        console.log(this.props)
        sendForAnalysing(url, this.props.instanceId, projection)
    }

    render() {
        console.log(this.props.analyseState)       
        switch (this.props.analyseState) {
            case 'ANALYSING':
                return <div style={{ marginTop: '120px'}}>
                    <Container style={{ width: '400px' }}><CircularProgress /></Container>
                </div >
            case 'ANALYSED':
                return <div style={{ marginTop: '120px' }}>
                    <Container style={{ width: '400px' }}>
                        {Object.keys(this.props.analyseResult).map(key => (
                            <AnalyseCard key={key}
                                frameNumber={key}
                                imageString={this.props.analyseResult[key]}>
                            </AnalyseCard>
                            
                        ))}
                    </Container>
                </div >
            default: return <div style={{ marginTop: '120px' }}>
                <Container style={{ width: '400px'}}>
                    <Button variant="outlined" color="primary" onClick={this.sendForAnalysingClick}>
                        Отправить на анализ</Button>
                </Container>
            </div>
        }
    }
}

export const mapStateToProps = state => ({
    analyseResult: getAnalyseResult(state),
    analyseError: getAnalyseError(state),
    instanceId: getInstanceId(state),
    analyseState: getAnalyseState(state)
})

export const mapDispatchToProps = dispatch => bindActionCreators({
    sendForAnalysing: (url, instanceId, projection) => sendToAnalyseThunk(url, instanceId, projection)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel)

