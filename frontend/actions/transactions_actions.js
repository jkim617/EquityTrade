import * as TransactionsAPIUtil from '../util/transactions_api_util';

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';

const receiveTransactions = (transactions) => ({
    type: RECEIVE_TRANSACTIONS,
    transactions
})

const createTransaction = (transactions) => ({
    type: CREATE_TRANSACTION,
    transactions
})


export const fetchTransactions = () => dispatch => {
    return(TransactionsAPIUtil.fetchTransactions().then(transactions => (
        dispatch(receiveTransactions(transactions))
    )))
}

export const addTransaction = (user_id, ticker, price, num_shares, order_type) => dispatch => {
    return (TransactionsAPIUtil.addTransaction(user_id, ticker, price, num_shares, order_type).then(transactions => (
        dispatch(createTransaction(transactions))
    )))
}