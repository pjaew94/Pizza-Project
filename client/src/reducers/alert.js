import { SHOW_ALERT, HIDE_ALERT } from '../actions/types';

const initialState = {
    msg: '',
    show: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const { type, msg } = action;

    switch(type) {
        case SHOW_ALERT:
            return {
                msg: msg,
                show: true
            }
        case HIDE_ALERT:
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}