export const fetchTransactions = () => (

    $.ajax({
        method: 'GET',
        url: '/api/transactions'
    })
)

export const addTransaction = (user_id, ticker, price, num_shares, order_type) => {

    return (
    $.ajax({
        method: 'POST',
        url: `/api/transactions/`,
        data: {
            user_id,
            ticker,
            price,
            num_shares,
            order_type
        }
    }))
}