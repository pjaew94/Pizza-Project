import { combineReducers } from 'redux';

import auth from './auth'
import nav from './nav'
import location from './location'

export default combineReducers({
    auth,
    nav,
    location
});