import { combineReducers } from 'redux';

import entities from './entities_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import prices from './stocks_reducer';
import transactions from './transactions_reducer';




const rootReducer = combineReducers({
    entities,
    session,
    errors,
    prices,
    transactions
});

export default rootReducer;
