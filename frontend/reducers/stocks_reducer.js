import {
    RECEIVE_CURRENT_PRICE,
    RECEIVE_INTRADAY_PRICES,
    RECEIVE_HISTORICAL_PRICES,
    RECEIVE_COMPANY,
    RECEIVE_SEARCH
} from '../actions/stocks_actions';


const stocksReducer = (state= {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    
   
    switch(action.type) {
        case RECEIVE_CURRENT_PRICE:
            nextState[action.ticker] = action.price;
            return nextState;
        case RECEIVE_INTRADAY_PRICES:
            nextState['prices'] = action.prices;
            return nextState;
        case RECEIVE_HISTORICAL_PRICES:
            nextState['prices'] = action.prices;
            return nextState;
        case RECEIVE_COMPANY:
            nextState['company'] = action.company;
            return nextState;
        case RECEIVE_SEARCH:
            nextState['searchResults'] = action.searchResults;
            return nextState
        default:
            return state;
    }
};

export default stocksReducer;

