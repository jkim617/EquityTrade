import React from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fragment: '',
            status: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        debugger
        if (prevProps.props.pathName !== this.props.props.pathName) {
            this.setState({fragment: ''})
        }
    }

    update() {
      
        return e => this.setState({fragment: e.currentTarget.value, 
                                    status: true}, () => this.props.props.fetchSearchResults(this.state.fragment))
        
    }
    

    searchField() {
        return (
            <div className='nav-search'>
                <input placeholder="Search" type="text"
                value={this.state.fragment}
                onChange={this.update()}
                className={this.state.fragment === '' ? 'nav-search-input' : 'nav-search-input-open'} />
            </div>
        )
    }

    renderResults() {

       
        if(this.props.props.searchResults === undefined || this.props.props.searchResults.length === 0)
                {return <div className='search-result-error'>We were unable to find any results for your search.</div>}

        return this.props.props.searchResults.map((result, i) => {

            return (
                <Link to={{
                    pathname: `/stocks/${result.symbol}`,
                    state: {ticker: result.symbol, 
                            name: result.securityName}} }
                    className='result-stock' key={i}>
                    <div className='result-stock-symbol'>{result.symbol.slice(0,50)}</div>
                    <div className='result-stock-name'>{result.securityName.slice(0,50)}</div>
                </Link>
            )
        })
    }

    render() {
    
    
        return(
            <div className='sub-nav-2'>
                {this.searchField()}
                <div className={this.state.fragment !== '' ? 'results-box' : 'results-box-hidden'}>
                    <div className={(this.props.props.searchResults === undefined || this.props.props.searchResults.length === 0) ? 
                                    'results-box-title-hidden' : 'results-box-title'}>Shops</div>
                    <div className='results-box-body'>
                        {this.renderResults()}
                    </div>
                    
                </div>
                
                <div>

                </div>
            </div>
        )
    }
}

export default SearchBar;