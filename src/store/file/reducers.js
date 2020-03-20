import {
    PUT_UPLOAD_STUDY_FILES,
    DELETE_STUDY_FILE,
    REPLACE_STUDY_FILE,
    FETCH_STUDY_LIST_PENDING,
    FETCH_STUDY_LIST_ERROR,
    FETCH_STUDY_LIST_SUCCESS,

    SEND_FILES_TO_STORAGE_PENDING,
    SEND_FILES_TO_STORAGE_SUCCESS,
} from "./actions"

const defaultState = {
    studies: [],
    pending: false,
    error: null,
    uploadedFiles: null,
    uploading: false
}

export const fileReducer = (state = defaultState, action) => {
    console.log(state)
    switch (
    action.type
    ) {
        case FETCH_STUDY_LIST_PENDING:
            return {
                ...state,
                pending: true
            }

        case FETCH_STUDY_LIST_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case FETCH_STUDY_LIST_SUCCESS:
            return {
                ...state,
                studies: action.payload,
                pending: false
            }

        case PUT_UPLOAD_STUDY_FILES:
            return {
                ...state,
                uploadedFiles: action.payload
            }

        case DELETE_STUDY_FILE: {
            return {
                ...state,
                studies: undefined
            }
        }

        case REPLACE_STUDY_FILE: {
            return {
                ...state,
                studies: undefined
            }
        }

        case SEND_FILES_TO_STORAGE_PENDING: {
            return {
                ...state,
                uploading: true
            }
        }

        case SEND_FILES_TO_STORAGE_SUCCESS: {
            return {
                ...state,
                uploading: false
            }
        }

        default: return state
    }
}

export const getStudyList = state => state.files.studies;
export const getStudyListPending = state => state.files.pending;
export const getStudyListError = state => state.files.error;
export const getFileUploading = state => state.files.uploading;
