import { SHOW_ALERT, HIDE_ALERT } from './types';

export const showAlert = (msg, timeout = 3000) => dispatch => {
    try {
        dispatch({
            type: SHOW_ALERT,
            msg: msg
        })

        setTimeout(() => dispatch({ type: HIDE_ALERT }), timeout)

    } catch (err) {
        console.log(err.message)
    }
}

// export const removeAlert = () => dispatch => {
//     try {
//         dispatch({
//             type: HIDE_ALERT
//         })
//     } catch (err) {
//         console.log(err.message)
//     }
// }

