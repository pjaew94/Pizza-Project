import { combineReducers } from 'redux';

import auth from './auth'
import nav from './nav'
import location from './location'
import cart from './cart'
import alert from './alert'

export default combineReducers({
    auth,
    nav,
    location,
    cart,
    alert
});