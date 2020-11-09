import { combineReducers } from 'redux';

import entities from './entities_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import prices from './stocks_reducer';
import transactions from './transactions_reducer';

import {LOGOUT_CURRENT_USER} from '../actions/session_actions';


const rootReducer = combineReducers({
    entities,
    session,
    errors,
    prices,
    transactions
});

export default (state, action) => rootReducer(action.type === 'LOGOUT_CURRENT_USER' ? undefined: state, action);
