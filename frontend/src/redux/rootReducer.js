import { combineReducers } from 'redux';
import  userReducers from './userReducers'

const rootReducer = combineReducers({
    userLogin:userReducers
});

export default rootReducer;
