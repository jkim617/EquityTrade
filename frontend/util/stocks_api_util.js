const prod_key = 'pk_8fdc841848514fb2a0b1b454ab2d6be2'
const test_key = 'Tpk_744f03d1c887482bac12bddbadff8175'

export const fetchCurrentPrice = (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${prod_key}`
        // url: `https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=${test_key}`
    })
}

export const fetchIntradayPrices = (tickers) => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers}&types=intraday-prices&token=${prod_key}`
        // url: `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${tickers}&types=intraday-prices&token=${test_key}`
    })
}

export const fetchHistoricalPrices = (tickers, range) => {

    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers}&types=chart&range=${range}&includeToday=true&token=${prod_key}`
        // url: `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${tickers}&types=chart&range=${range}&includeToday=true&token=${test_key}`
    })
}

export const fetchCompany = (ticker) => {

    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${prod_key}`
        // url: `https://sandbox.iexapis.com/stable/stock/${ticker}/company?token=${test_key}`
    })
}

export const fetchCompanyStats = (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/stats?token=${prod_key}`
        // url: `https://sandbox.iexapis.com/stable/stock/${ticker}/stats?token=${test_key}`
    })
}

export const fetchSearchResults = (fragment) => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/search/${fragment}?token=${prod_key}`
        // url: `https://sandbox.iexapis.com/stable/search/${fragment}?token=${test_key}`
    })
}

export const fetchGeneralNews = () => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/time-series/news/?last=10&token=${prod_key}`
        // url: `https://sandbox.iexapis.com/stable/time-series/news/?last=10&token=${test_key}`
    })
}

export const fetchStockNews = (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/news?token=${prod_key}`
        // url: `https://sandbox.iexapis.com/stable/stock/${ticker}/news?token=${test_key}`
    })
}



//use batch endpoints - when you fetch all prices for stocks in your portfolio