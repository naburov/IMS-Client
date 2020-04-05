import {
    setAnalysisState,
    sendForAnalysisSuccess,
    sendForAnalysisError
} from "./actions"



export const sendToAnalyseThunk = (instanceUrl, instanceId, projection) => {
    return dispatch => {
        console.log("send for analysing")
        console.log(instanceUrl)
        console.log(instanceId)
        console.log(projection)

        dispatch(setAnalysisState('ANALYSING'))

        var url = new URL('http://localhost:5000/predict')
        var params = {
            'url': instanceUrl,
            'projection': projection,
            'instanceid': instanceId,
            'firstIndex':150,
            'lastIndex':170
        }
        url.search = new URLSearchParams(params)

        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)                
                console.log(typeof(json))
                dispatch(setAnalysisState('ANALYSED'))
                dispatch(sendForAnalysisSuccess(json))
            })
            .catch(error => {
                dispatch(setAnalysisState('NOT ANALYSED'))
                dispatch(sendForAnalysisError(error))
            })

    }
}