import {
    SEND_FOR_ANALYSE_ERROR,
    SEND_FOR_ANALYSE_SUCCESS,
    SET_ANALYSE_STATE,
} from "./actions"

const defaultState = {
    analysisResult: {},
    analysisError: null,
    analysisState: 'NOT ANALYSED'
}

export const analysisReducer = (state = defaultState, action) => {
    switch (
    action.type
    ) {
        case SET_ANALYSE_STATE:
            return {
                ...state,
                analysisState: action.payload
            }

        case SEND_FOR_ANALYSE_ERROR: {
            return {
                ...state,
                analysisError: action.payload,
            }
        }

        case SEND_FOR_ANALYSE_SUCCESS: {
            return {
                ...state,
                analysisResult: action.payload,
            }
        }      

        default: return state

    }
}

export const getAnalyseResult = state => state.analysis.analysisResult
export const getAnalyseError = state => state.analysis.analysisError
export const getAnalyseState = state => state.analysis.analysisState