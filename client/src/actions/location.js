import { SET_LOCATION, REMOVE_LOCATION } from "./types";

export const setLocation = formData => dispatch => {
    try {
        dispatch({
            payload: formData,
            type: SET_LOCATION
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const removeLocation = () => dispatch => {
    try {
        dispatch({
            type: REMOVE_LOCATION
        })
    } catch (err) {
        console.log(err.message)
    }
}

