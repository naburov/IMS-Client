
export const SEND_FOR_ANALYSE_ERROR = 'SEND_FOR_ANALYSE_ERROR'
export const SEND_FOR_ANALYSE_SUCCESS = 'SEND_FOR_ANALYSE_SUCCESS'
export const SET_ANALYSE_STATE = 'SET_ANALYSE_STATE'

export const setAnalysisState = (analysisState) => ({
    type: SET_ANALYSE_STATE,
    payload: analysisState
})

export const sendForAnalysisSuccess = (analysisResult) => ({
    type: SEND_FOR_ANALYSE_SUCCESS,
    payload: analysisResult
})

export const sendForAnalysisError = (analysisResult) => ({
    type: SEND_FOR_ANALYSE_SUCCESS,
    payload: analysisResult
})