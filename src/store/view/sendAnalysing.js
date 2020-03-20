import {
    setAnalyseState,
    sendToAnalyseSuccess,
    sendToAnalyseError
} from "./actions"



export const sendToAnalyseThunk = (instanceUrl, instanceId, projection) => {
    return dispatch => {
        console.log("send for analysing")
        console.log(instanceUrl)
        console.log(instanceId)
        console.log(projection)

        dispatch(setAnalyseState('ANALYSING'))

        var url = new URL('http://localhost:5000/predict')
        var params = {
            'url': instanceUrl,
            'projection': projection,
            'instanceid': instanceId,
            'firstIndex':50,
            'lastIndex':300
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
                dispatch(setAnalyseState('ANALYSED'))
                dispatch(sendToAnalyseSuccess(json))
            })
            .catch(error => {
                dispatch(setAnalyseState('NOT ANALYSED'))
                dispatch(sendToAnalyseError(error))
            })

    }
}