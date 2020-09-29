import {
    RECEIVE_CURRENT_PRICE,
    RECEIVE_INTRADAY_PRICES,
    RECEIVE_HISTORICAL_PRICES,
    RECEIVE_COMPANY
} from '../actions/stocks_actions';


const stocksReducer = (state= {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_CURRENT_PRICE:
            nextState[action.ticker].current_price = action.price;
            return nextState;
        case RECEIVE_INTRADAY_PRICES:
            nextState[action.ticker].intraday_prices = action.prices;
            return nextState;
        case RECEIVE_HISTORICAL_PRICES:
            nextState[action.ticker].historical_prices = action.prices;
            return nextState;
        case RECEIVE_COMPANY:
            nextState[action.ticker].company = action.company;
            return nextState;
        default:
            return state;
    }
};

export default stocksReducer;

