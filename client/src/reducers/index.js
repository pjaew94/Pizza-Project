import { combineReducers } from 'redux';

import nav from './nav'
import location from './location'
import cart from './cart'
import alert from './alert'

export default combineReducers({
    nav,
    location,
    cart,
    alert
});