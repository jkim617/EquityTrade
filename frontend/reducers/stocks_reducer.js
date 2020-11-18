import {
    RECEIVE_CURRENT_PRICE,
    RECEIVE_INTRADAY_PRICES,
    RECEIVE_HISTORICAL_PRICES,
    RECEIVE_COMPANY,
    RECEIVE_SEARCH,
    RECEIVE_GENERAL_NEWS,
    RECEIVE_STOCK_NEWS
} from '../actions/stocks_actions';


const stocksReducer = (state= {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    
   debugger
    switch(action.type) {
        case RECEIVE_CURRENT_PRICE:
            nextState['currentPrice'] = action.price;
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
            return nextState;
        case RECEIVE_GENERAL_NEWS:
            nextState['generalNews'] = action.news;
            return nextState;
        case RECEIVE_STOCK_NEWS:
            nextState['stockNews'] = action.news;
            return nextState;
        default:
            return state;
    }
};

export default stocksReducer;

