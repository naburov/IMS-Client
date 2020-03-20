import {
    uploadFileToServerPending,
    uploadFileToServerSuccess
} from "./actions"

import { fetchStudyListThunk } from './fetchStudyList'
import { SkeletonHelper } from "three"
import SelectInput from "@material-ui/core/Select/SelectInput"

export const uploadFilesThunk = (files) => {
    return dispatch => {
        console.log(files)
        dispatch(uploadFileToServerPending())
        let requests = files.map(file => {
            fetch("http://localhost:8042/instances", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/dicom',
                    'Authorization': 'Basic ' + btoa('orthanc:orthanc')
                },
                body: file
            })
        })

        Promise.all(requests)
            .then()
            .then(response => {
                dispatch(uploadFileToServerSuccess())
                console.log("success")
            })
            .then(r => {
                setTimeout(function () {
                    dispatch(fetchStudyListThunk())
                }, 10000);
            })
            .catch(error => {
                console.log('error')
                console.log(error)
            })

    }
}

