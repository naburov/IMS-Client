import {
    fetchStudyListSuccess,
    fetchStudyListError,
    fetchStudyListPending
} from './actions'

var STUDIES_URL = "http://localhost:8042/studies"

export const fetchStudyListThunk = (dispatch) => {
    return dispatch => {
        console.log("start loading study list")
        dispatch(fetchStudyListPending());
        fetch(STUDIES_URL)
            .then(response => response.json())
            .then(result => {

                if (result.error) {
                    throw (result.error)
                }

                var studies = []

                for (let i = 0; i < result.length; i++) {
                    studies.push(STUDIES_URL + "/" + result[i])
                }

                let requests = studies.map(url => fetch(url))

                console.log('requests')

                Promise.all(requests)
                    .then(response => Promise.all(response.map(r => r.json())))
                    .then(response => {
                        dispatch(fetchStudyListSuccess(response))
                    })
                    .catch(error => {
                        console.log('error')
                    })

            }).catch(error => {
                dispatch(fetchStudyListError());
            })
    }
}
