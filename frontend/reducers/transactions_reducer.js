import {
    RECEIVE_TRANSACTIONS,
    CREATE_TRANSACTION
} from '../actions/transactions_actions';

const transactionsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
 
    switch(action.type) {

        case RECEIVE_TRANSACTIONS:
            return Object.assign(nextState, action.transactions);
        case CREATE_TRANSACTION:
            return Object.assign(nextState, action.transactions)
        default:
            return state
    }
};

export default transactionsReducer;