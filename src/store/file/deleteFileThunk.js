import {
    deleteFile
} from './actions'

import { fetchStudyListThunk } from './fetchStudyList'

export const DeleteFileThunk = (id) => {
    return dispatch => {
        dispatch(deleteFile(id))
        fetch(`http://localhost:8042/studies/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + btoa('orthanc:orthanc')
                },
            })
            .then(r => {
                dispatch(fetchStudyListThunk())
            })
            .catch(error => {
                console.log('error')
                console.log(error)
            })
    }
}