import {combineReducers} from 'redux';

import {postReducers,userPostReducers} from './posts';

export default combineReducers({
    postReducers,
    userPostReducers
})