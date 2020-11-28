import { ADD_ITEM, REMOVE_ITEM, INCREASE_COUNT, DECREASE_COUNT, CLEAR_CART } from './types'

export const addItem = (payload) => dispatch => {
    try {
        dispatch({
            payload: payload,
            type: ADD_ITEM
        });
    } catch (err) {
        console.log(err.message);
    }
}

export const removeItem = (payload) => dispatch => {
    try {
        dispatch({
            payload: payload,
            type: REMOVE_ITEM
        });
    } catch (err) {
        console.log(err.message);
    }
}

export const clearCart = () => dispatch => {
    try {
        dispatch({
            type: CLEAR_CART
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const increaseCount = (payload) => dispatch => {
    try {
        dispatch({
            payload: payload,
            type: INCREASE_COUNT
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const decreaseCount = (payload) => dispatch => {
    try {
        dispatch({
            payload: payload,
            type: DECREASE_COUNT
        })
    } catch (err) {
        console.log(err.message)
    }
}