const test_key = 'Tsk_6237da856fd441e2b404e73c058edaa8'

export const fetchCurrentPrice = (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=${test_key}`
    })
}

export const fetchIntradayPrices = (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/intraday-prices?token=${test_key}`
    })
}

export const fetchHistoricalPrices = (ticker, range) => {
    return $.ajax({
        method: 'GET',
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${range}?token=${test_key}`
    })
}

export const fetchCompany = (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/company?token=${test_key}`
    })
}

//use batch endpoints - when you fetch all prices for stocks in your portfolio