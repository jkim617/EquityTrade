import { connect } from 'react-redux';

import {
    fetchIntradayPrices,
    fetchHistoricalPrices
} from '../../../actions/stocks_actions';

import StockBody from './stock_body';

const mapStatetoProps = (state) => {
    return {}
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockBody);