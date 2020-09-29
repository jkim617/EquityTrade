import * as StocksAPIUtil from '../util/stocks_api_util';

export const RECEIVE_CURRENT_PRICE = 'RECEIVE_CURRENT_PRICE';
export const RECEIVE_INTRADAY_PRICES = 'RECEIVE_INSTRADAY_PRICES';
export const RECEIVE_HISTORICAL_PRICES = 'RECEIVE_HISTORICAL_PRICES';
export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';

const receiveCurrentPrice = (ticker, price) => ({
    type: RECEIVE_CURRENT_PRICE,
    ticker,
    price
});

const receiveIntradayPrices = (ticker, prices) => ({
    type: RECEIVE_INTRADAY_PRICES,
    ticker,
    prices
})

const receiveHistoricalPrices = (ticker, prices) => ({
    type: RECEIVE_HISTORICAL_PRICES,
    ticker,
    prices
})

const receiveCompany = (ticker, company) => ({
    type: RECEIVE_COMPANY,
    ticker,
    company
});


export const fetchCurrentPrice = ticker => dispatch => (
    StocksAPIUtil.fetchCurrentPrice(ticker).then(data => (
        dispatch(receiveCurrentPrice(ticker, data))
    )
));

export const fetchIntradayPrices = ticker => dispatch => (
    StocksAPIUtil.fetchIntradayPrices(ticker).then(data => (
        dispatch(receiveIntradayPrices(ticker, data))
    )
));

export const fetchHistoricalPrices = (ticker, range) => dispatch => (
    StocksAPIUtil.fetchHistoricalPrices(ticker, range).then(data => (
        dispatch(receiveHistoricalPrices(ticker, data))
    )
));

export const fetchCompany = (ticker) => dispatch => (
    StocksAPIUtil.fetchCompany(ticker).then(data => (
        dispatch(receiveCompany(ticker, data))
    )
));


