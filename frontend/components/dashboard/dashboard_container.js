import { connect } from 'react-redux';

import { fetchIntradayPrices} from '../../actions/stocks_actions';
import Dashboard from './dashboard';

const mapStateToProps = (state) => {
 
    return {
       stocks: state.stocks 
    };
};

const mapDispatchToProps = dispatch => ({
    fetchIntradayPrices: ticker => dispatch(fetchIntradayPrices(ticker))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
