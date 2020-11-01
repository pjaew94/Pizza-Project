import { SHOW_NAV, HIDE_NAV } from "./types";

export const showNav = () => dispatch => {
    try {
        dispatch({
            type: SHOW_NAV
        });

    } catch (err) {
        console.log(err.message);
    }
}

export const hideNav = () => dispatch => {
    try {
        dispatch({
            type: HIDE_NAV
        });

    } catch (err) {
        console.log(err.message);
    }
}