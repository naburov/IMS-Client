import { volume as XVolume} from 'xtk'

import {
    loadFileSuccess,
    loadFileError,
    loadFilePending,
    putInstanceId
} from './actions'


var SERIES_URL = "http://localhost:8042/series"

export const loadInstanceFileThunk = (seriesId) => {
    return dispatch => {
        console.log('Start loading file')
        dispatch(loadFilePending)
        fetch(SERIES_URL + '/' + seriesId)
            .then(response => response.json())
            .then(json => {
                dispatch(putInstanceId(json.Instances))
                return json.Instances
            })
            .then(instanceIds => {
                // console.log('Creating volume')
                // var volume = new XVolume();
                // volume.file =  instanceIds.map(id => `http://localhost:8042/instances/${id}.dcm/file`);
                // console.log(volume)
                // console.log('File set!')
                dispatch(loadFileSuccess('volume'))
                // xVolume.file = instanceIds.map(id => `http://localhost:8042/instances/${id}/file`);
                // xVolume.load()
                //     .then((volume) => {
                //         console.log("volume loaded")
                //         dispatch(loadFileSuccess(volume))
                //     })
            })
            .catch(error => {
                dispatch(loadFileError(error))
            })
    }
}

