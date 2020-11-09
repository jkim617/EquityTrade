const test_key = 'pk_da6f958643674a6ea705e5cbc42a84d4'

export const fetchCurrentPrice = (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${test_key}`
    })
}

export const fetchIntradayPrices = (tickers) => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers}&types=intraday-prices&token=${test_key}`
    })
}

export const fetchHistoricalPrices = (tickers, range) => {

    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers}&types=chart&range=${range}&includeToday=true&token=${test_key}`
    })
}

export const fetchCompany = (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${test_key}`
    })
}

export const fetchSearchResults = (fragment) => {
    return $.ajax({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/search/${fragment}?token=${test_key}`
    })
}

//use batch endpoints - when you fetch all prices for stocks in your portfolio