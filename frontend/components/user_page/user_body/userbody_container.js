import { connect } from 'react-redux';

import {
    fetchIntradayPrices,
    fetchHistoricalPrices,
    fetchCompany,
    fetchCurrentPrice,
    fetchGeneralNews,
    fetchStockNews,
    fetchCompanyStats
} from '../../../actions/stocks_actions';
import { fetchTransactions,
         addTransaction } from '../../../actions/transactions_actions';
import { addFunds,
        refreshUser } from '../../../actions/users_actions';

import UserBody from './user_body';

const mapStateToProps = (state, ownProps) => {
    
    let currentUser = state.session.id
  
    return {
        pathName: ownProps.pathName,
        user: state.entities.users[currentUser],
        transactions: Object.values(state.transactions),
        currentPrice: state.prices.currentPrice,
        prices: state.prices.prices,
        companyDescription: state.prices.company,
        generalNews: state.prices.generalNews,
        stockNews: state.prices.stockNews,
        companyStats: state.prices.companyStats
    };

    
};

const mapDispatchToProps = dispatch => ({
    fetchCurrentPrice: ticker => dispatch(fetchCurrentPrice(ticker)),
    fetchIntradayPrices: tickers => dispatch(fetchIntradayPrices(tickers)),
    fetchHistoricalPrices: (tickers, range) => dispatch(fetchHistoricalPrices(tickers, range)),
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchCompany: ticker => dispatch(fetchCompany(ticker)),
    addFunds: (amount, id) => dispatch(addFunds(amount, id)),
    addTransaction: (user_id, ticker, price, num_shares, order_type) => dispatch(addTransaction(user_id, ticker, price, num_shares, order_type)),
    refreshUser: id => dispatch(refreshUser(id)),
    fetchGeneralNews: () => dispatch(fetchGeneralNews()),
    fetchStockNews: ticker => dispatch(fetchStockNews(ticker)),
    fetchCompanyStats: ticker => dispatch(fetchCompanyStats(ticker))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBody);
