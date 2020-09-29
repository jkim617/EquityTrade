import { combineReducers } from 'redux';

import entities from './entities_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import stocks from './stocks_reducer';




const rootReducer = combineReducers({
    entities,
    session,
    errors,
    stocks

});

export default rootReducer;
