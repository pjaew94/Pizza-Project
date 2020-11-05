import { SET_LOCATION } from "./types";

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

