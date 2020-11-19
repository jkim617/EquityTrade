import * as StocksAPIUtil from '../util/stocks_api_util';

export const RECEIVE_CURRENT_PRICE = 'RECEIVE_CURRENT_PRICE';
export const RECEIVE_INTRADAY_PRICES = 'RECEIVE_INTRADAY_PRICES';
export const RECEIVE_HISTORICAL_PRICES = 'RECEIVE_HISTORICAL_PRICES';
export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';
export const RECEIVE_COMPANY_STATS = 'RECEIVE_COMPANY_STATS';
export const RECEIVE_SEARCH =  'RECEIVE_SEARCH';
export const RECEIVE_STOCK_NEWS = 'RECEIVE_STOCK_NEWS';
export const RECEIVE_GENERAL_NEWS = 'RECEIVE_GENERAL_NEWS';

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

const receiveCompanyStats = (ticker, stats) => ({
    type: RECEIVE_COMPANY_STATS,
    ticker,
    stats
})

const receiveStockNews = (ticker, news) => ({
    type: RECEIVE_STOCK_NEWS,
    ticker,
    news
});

const receiveGeneralNews = (news) => ({
    type: RECEIVE_GENERAL_NEWS,
    news
});

export const fetchStockNews = ticker => dispatch => (
    StocksAPIUtil.fetchStockNews(ticker).then(news => (
        dispatch(receiveStockNews(ticker, news))
    ))
);
  
export const fetchGeneralNews = () => dispatch => (
    StocksAPIUtil.fetchGeneralNews().then(news => (
        dispatch(receiveGeneralNews(news))
    ))
);


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

export const fetchCompanyStats = (ticker) => dispatch => (
    StocksAPIUtil.fetchCompanyStats(ticker).then(data => (
        dispatch(receiveCompanyStats(ticker, data))
    ))
);

