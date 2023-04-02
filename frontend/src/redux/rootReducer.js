import { combineReducers } from 'redux';
import { productReducers } from './productReducer';
import  userReducers from './userReducers'

const rootReducer = combineReducers({
    userLogin: userReducers,
    dataProduct:productReducers,
});

export default rootReducer;
