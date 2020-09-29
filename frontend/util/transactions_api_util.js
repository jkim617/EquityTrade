export const fetchTransactions = () => (
    $.ajax({
        method: 'GET',
        url: '/api/transactions'
    })
)