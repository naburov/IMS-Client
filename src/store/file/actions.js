export const FETCH_STUDY_LIST_PENDING = 'FETCH_STUDY_LIST_PENDING'
export const FETCH_STUDY_LIST_ERROR = 'FETCH_STUDY_LIST_ERROR'
export const FETCH_STUDY_LIST_SUCCESS = 'FETCH_STUDY_LIST_SUCCESS'

export const SEND_STUDY_FILE_TO_STORAGE = 'SEND_STUDY_FILE_TO_STORAGE'
export const SEND_FILES_TO_STORAGE_PENDING = 'SEND_FILES_TO_STORAGE_PENDING'
export const SEND_FILES_TO_STORAGE_SUCCESS = 'SEND_FILES_TO_STORAGE_SUCCESS'

export const PUT_UPLOAD_STUDY_FILES = 'PUT_UPLOAD_STUDY_FILES'
export const DELETE_STUDY_FILE = 'DELETE_STUDY_FILE'
export const REPLACE_STUDY_FILE = 'REPLACE_STUDY_FILE'

export const fetchStudyListPending = () => ({
    type: FETCH_STUDY_LIST_PENDING,
})

export const fetchStudyListError = (error) => ({
    type: FETCH_STUDY_LIST_ERROR,
    payload: error
})

export const fetchStudyListSuccess = (studyList) => ({
    type: FETCH_STUDY_LIST_SUCCESS,
    payload: studyList
})

export const uploadFileToServerPending = () => ({
    type: SEND_FILES_TO_STORAGE_PENDING
})

export const uploadFileToServerSuccess = () => ({
    type: SEND_FILES_TO_STORAGE_SUCCESS
})

export const putUploadedStudyFiles = (file) => ({
    type: PUT_UPLOAD_STUDY_FILES,
    payload: file
})

export const deleteFile = (instanceId) => ({
    type: DELETE_STUDY_FILE,
    payload: instanceId
})

export const replaceStudy = (newFile, instanceId) => ({
    type: REPLACE_STUDY_FILE,
    payload: {
        file:newFile,
        instanceId: instanceId
    }
})