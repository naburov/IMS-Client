export const SET_LAYOUT = 'SET_LAYOUT'
export const SEND_FOR_ANALYSE_ERROR = 'SEND_FOR_ANALYSE_ERROR'
export const SEND_FOR_ANALYSE_SUCCESS = 'SEND_FOR_ANALYSE_SUCCESS'
export const SET_TOOL = 'SET_TOOL'
export const LOAD_FILE_ERROR = 'LOAD_FILE_ERROR'
export const LOAD_FILE_PENDING = 'LOAD_FILE_PENDING'
export const LOAD_FILE_SUCCESS = 'LOAD_FILE_SUCCESS'
export const PUT_INSTANCE_ID = 'PUT_INSTANCE_ID'
export const SET_ANALYSE_STATE = 'SET_ANALYSE_STATE'

export const setViewLayout = (newLayout) => ({
    type: SET_LAYOUT,
    payload: newLayout
})

export const putInstanceId = (instanceId) => ({
    type:PUT_INSTANCE_ID,
    payload: instanceId
})

export const setAnalyseState = (analyseState) => ({
    type: SET_ANALYSE_STATE,
    payload: analyseState
})

export const sendToAnalyseSuccess = (analyseResult) => ({
    type: SEND_FOR_ANALYSE_SUCCESS,
    payload: analyseResult
})

export const sendToAnalyseError = (analyseResult) => ({
    type: SEND_FOR_ANALYSE_SUCCESS,
    payload: analyseResult
})


export const setTool = (newTool) => ({
    type: SET_TOOL,
    payload: newTool
})

export const loadFileSuccess = (stack) => ({
    type: LOAD_FILE_SUCCESS,
    payload: stack
})

export const loadFilePending = () => ({
    type: LOAD_FILE_PENDING
})

export const loadFileError = (error) => ({
    type: LOAD_FILE_ERROR,
    payload: error
})