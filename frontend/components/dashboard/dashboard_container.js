import { connect } from 'react-redux';

import { fetchIntradayPrices,
        fetchHistoricalPrices} from '../../actions/stocks_actions';
import { fetchTransactions } from '../../actions/transactions_actions';
import { addFunds } from '../../actions/users_actions';

import Dashboard from './dashboard';

const mapStateToProps = (state) => {
    return {
        user: state.entities.users[1],
        transactions: Object.values(state.transactions),   
        prices: state.prices
    
    };
};

const mapDispatchToProps = dispatch => ({
    fetchIntradayPrices: tickers => dispatch(fetchIntradayPrices(tickers)),
    fetchHistoricalPrices: (tickers, range) => dispatch(fetchHistoricalPrices(tickers, range)),
    fetchTransactions: () => dispatch(fetchTransactions()),
    addFunds: (amount, id) => dispatch(addFunds(amount, id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
