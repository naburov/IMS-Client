
import { setAnalysisState } from './actions'

var SERIES_URL = "http://localhost:8042/series"
var STUDIES_URL = "http://localhost:8042/studies"

export const checkIsAnalysedThunk = (studyId) => {
    return dispatch => {
        var studyUrl = STUDIES_URL + '/' + studyId
        fetch(studyUrl)
            .then(response => response.json())
            .then(result => {
                return result.Series
            })
            .then((series) => {
                var requests = series.map(url => fetch(SERIES_URL + '/' + url))
                Promise.all(requests)
                    .then(response => Promise.all(response.map(r => r.json())))
                    .then(response => {
                        var analysed = false
                        for (var i = 0; i <= response.length - 1; i++) {
                            if (response[i].MainDicomTags.Modality == "RTSTRUCT") {
                                analysed = true
                                dispatch(setAnalysisState('ANALYSED'))
                            }
                        }
                        if (!analysed)
                            dispatch(setAnalysisState('NOT ANALYSED'))
                    })
                    .catch(error => {
                        console.log('error in analyse checking')
                    })
            })

    }
}