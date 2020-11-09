import * as StocksAPIUtil from '../util/stocks_api_util';

export const RECEIVE_CURRENT_PRICE = 'RECEIVE_CURRENT_PRICE';
export const RECEIVE_INTRADAY_PRICES = 'RECEIVE_INTRADAY_PRICES';
export const RECEIVE_HISTORICAL_PRICES = 'RECEIVE_HISTORICAL_PRICES';
export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';
export const RECEIVE_SEARCH =  'RECEIVE_SEARCH';

const receiveSearchResults = (data) => ({
    type: RECEIVE_SEARCH,
    searchResults: data
})

const receiveCurrentPrice = (ticker, price) => ({
    type: RECEIVE_CURRENT_PRICE,
    ticker,
    price
});

const receiveIntradayPrices = (tickers, prices) => ({
    type: RECEIVE_INTRADAY_PRICES,
    tickers,
    prices
})

const receiveHistoricalPrices = (tickers, prices) => ({
    type: RECEIVE_HISTORICAL_PRICES,
    tickers,
    prices
})

const receiveCompany = (ticker, company) => ({
    type: RECEIVE_COMPANY,
    ticker,
    company
});

export const fetchSearchResults = fragment => dispatch => {
  
    return StocksAPIUtil.fetchSearchResults(fragment).then(data => (
        dispatch(receiveSearchResults(data))
    ))
    }


export const fetchCurrentPrice = ticker => dispatch => (
    StocksAPIUtil.fetchCurrentPrice(ticker).then(data => (
        dispatch(receiveCurrentPrice(ticker, data))
    )
));

export const fetchIntradayPrices = tickers => dispatch => {

    return StocksAPIUtil.fetchIntradayPrices(tickers).then(data => (
        dispatch(receiveIntradayPrices(tickers, data))
    )
)};

export const fetchHistoricalPrices = (tickers, range) => dispatch => (
    StocksAPIUtil.fetchHistoricalPrices(tickers, range).then(data => (
        dispatch(receiveHistoricalPrices(tickers, data))
    )
));

export const fetchCompany = (ticker) => dispatch => (
    StocksAPIUtil.fetchCompany(ticker).then(data => (
        dispatch(receiveCompany(ticker, data))
    )
));


