import XVolume from "ami.js/src/helpers/x/helpers.x.volume"
import {
    loadFileSuccess,
    loadFileError,
    loadFilePending,
    putInstanceId
} from './actions'


var SERIES_URL = "http://localhost:8042/series"

export const loadInstanceFileThunk = (seriesId) => {
    return dispatch => {
        console.log("start loading")
        console.log(seriesId)
        console.log(SERIES_URL + '/' + seriesId)
        dispatch(loadFilePending)
        fetch(SERIES_URL + '/' + seriesId)
            .then(response => response.json())
            .then(json => {
                dispatch(putInstanceId(json.Instances))
                return json.Instances
            })
            .then(instanceIds => {
                const xVolume = new XVolume();
                xVolume.file = instanceIds.map(id => `http://localhost:8042/instances/${id}/file`);
                xVolume.load()
                    .then((volume) => {
                        console.log("volume loaded")
                        dispatch(loadFileSuccess(volume))
                    })
            })
            .catch(error => {
                dispatch(loadFileError(error))
            })
    }
}

