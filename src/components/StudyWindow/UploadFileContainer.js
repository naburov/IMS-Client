import React from 'react'
import Dropzone from 'react-dropzone';
import { Button, CircularProgress, Container, Typography } from '@material-ui/core';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { uploadFilesThunk } from '../../store/file/uploadFilesThunk'
import { getFileUploading } from '../../store/file/reducers'

class UploadFilesContainer extends React.Component {
    constructor() {
        super();
        this.onDrop = (files) => {
            this.setState({ files })
            console.log(this.state.files)
        };
        this.state = {
            files: []
        };
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadFiles() {
        this.props.uploadFiles(this.state.files)
        this.setState({ files: [] })
    }

    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));

        console.log(this.props.fileUploading)
        if (this.props.fileUploading)
            return (<CircularProgress style={{ marginTop: '5%' }} ></CircularProgress>)
        else
            return (
                <div>
                    <Dropzone accept=".dcm" onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <Container className="container" style={{padding:'50px'}}>
                                <div {...getRootProps({ className: 'dropzone' })}
                                    style={{
                                        height: '100px',
                                        border: 'solid 1px #d5d5d5',
                                        borderRadius: '5px'
                                    }}>
                                    <input {...getInputProps()} />
                                    <Typography>Перетащите сюда файлы для загрузки</Typography>
                                </div>
                                <aside>
                                    <Typography variant='h6'>Список файлов</Typography>
                                    <ul style={{listStyleType: 'none'}}>{files}</ul>
                                </aside>
                            </Container>
                        )}
                    </Dropzone>
                    <Button color="primary" variant="outlined" onClick={this.uploadFiles}>Отправить</Button>
                </div>
            );
    }
}

export const mapDispatchToProps = dispatch => bindActionCreators({
    uploadFiles: uploadFilesThunk
}, dispatch)

function mapStateToProps(state) {
    return {
        fileUploading: getFileUploading(state),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFilesContainer)