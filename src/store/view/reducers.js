import {
    SET_LAYOUT,
    SET_TOOL,
    SEND_FOR_ANALYSE_ERROR,
    SEND_FOR_ANALYSE_SUCCESS,
    SET_ANALYSE_STATE,
    LOAD_FILE_ERROR,
    LOAD_FILE_SUCCESS,
    LOAD_FILE_PENDING,
    PUT_INSTANCE_ID
} from "./actions"

const defaultState = {
    layout: 'MPR',
    instanceId: '',
    stack: undefined,
    pending: false,
    error: null,
    tool: '',
    analyseResult: {},
    analyseError: null,
    analyseState: 'NOT ANALYSED'
}

export const viewReducer = (state = defaultState, action) => {
    switch (
    action.type
    ) {
        case SET_LAYOUT:
            return {
                ...state,
                layout: action.payload
            }

        case SET_TOOL:
            return {
                ...state,
                tool: action.payload
            }

        case LOAD_FILE_PENDING: {
            return {
                ...state,
                pending: true
            }
        }

        case LOAD_FILE_SUCCESS: {
            return {
                ...state,
                stack: action.payload,
                pending: false
            }
        }

        case LOAD_FILE_ERROR: {
            return {
                ...state,
                error: action.payload,
                pending: false
            }
        }

        case PUT_INSTANCE_ID: {
            return {
                ...state,
                instanceId: action.payload
            }
        }

        default: return state

    }
}

export const getInstanceFile = state => state.view.stack;
export const getInstanceFilePending = state => state.view.pending;
export const getInstanceFileError = state => state.view.error;
export const getLayout = state => state.view.layout
export const getTool = state => state.view.tool
export const getInstanceId = state => state.view.instanceId