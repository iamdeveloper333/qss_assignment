export const ADD_SINGLE_RECORD = "ADD_SINGLE_RECORD";
export const UPDATE_SINGLE_RECORD = "UPDATE_SINGLE_RECORD";
export const DELETE_SINGLE_RECORD = "DELETE_SINGLE_RECORD";

export function addSingleRecord(details) {
    return {
        type: ADD_SINGLE_RECORD,
        details

    }
}
 
export function updateSingleRecord(details) {
    return {
        type: UPDATE_SINGLE_RECORD,
        details
    }
}

export function deleteSingleRecord(details) {
    return {
        type: DELETE_SINGLE_RECORD,
        details
    }
}
