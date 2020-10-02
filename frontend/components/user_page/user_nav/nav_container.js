import { connect } from 'react-redux';


import { fetchSearchResults } from '../../../actions/stocks_actions';
import UserNav from './nav';

const mapStateToProps = (state) => {
   debugger
    return {
        
        searchResults: state.prices.searchResults
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSearchResults: fragment => dispatch(fetchSearchResults(fragment))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserNav);
