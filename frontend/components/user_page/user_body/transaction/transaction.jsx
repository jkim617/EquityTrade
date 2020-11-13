import React from 'react';

class Transaction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fragment: '',
            status: 'buy',
            error: '',
            proceed: ''
        }
      
        this.reviewBuyTransaction = this.reviewBuyTransaction.bind(this);
        this.reviewBuyButton = this.reviewBuyButton.bind(this);
        this.highlightTransationSwitch = this.highlightTransactionSwitch.bind(this);
        this.transactionSwitch = this.transactionSwitch.bind(this);

    }

    update() {
        return e => {
            
            this.setState({
            fragment: e.currentTarget.value,
            error: '',
            proceed: ''
        })
    }
    }


    searchField() {
        return (
            <div className='shares-input'>
                <input placeholder="0" type="number"
                    min='0'
                    value={this.state.fragment}
                    onChange={this.update()}
                    className={this.state.fragment === '' ? 
                        'shares-input-close' : 
                            'shares-input-open'} />
            </div>
        )
    }

    renderError() {
        if (this.state.error === 'buy') {
            return (
                <div className = 'transaction-error'>
                    <div className = 'error-header'>
                        Not Enough Buying Power
                    </div>
                    <div>
                        You only have enough buying power to purchase {(this.props.props.user.funds / this.props.props.currentPrice).toFixed(5)} shares of {this.props.props.companyDescription.symbol}.
                    </div>
                </div>
            )
        } else if (this.state.error === 'sell') {
            let temp = this.getPortfolio();
            let ticker = this.props.props.companyDescription.symbol;
            return (
                <div className = 'transaction-error'>
                    <div className = 'error-header'>
                        Not Enough Shares
                    </div>
                    <div>
                        You can only sell up to {temp[ticker]} share(s) of {this.props.props.companyDescription.symbol}.
                    </div>
                </div>
            )
        }
    }

    renderBottom() {
      
        if (this.state.status === 'buy') {
            return(
            <div className={this.signReturn() === '+' ? 'transaction-table-bottom-text-green' : 'transaction-table-bottom-text-red'}>${this.props.props.user.funds.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' Buying Power Available'}</div>
            )
        } else {
            
            let temp = this.getPortfolio();
            let ticker = this.props.props.companyDescription.symbol;
            if (ticker in temp) {
                return temp[ticker] + ' Shares Available '
            }
        }
    }


    getPortfolio() {
        const names = {};

        this.props.props.transactions.forEach(transaction => {
            if (names[transaction.ticker]) {
                names[transaction.ticker] += transaction.num_shares
            }
            else { names[transaction.ticker] = transaction.num_shares }
        });

        return names;
    }

    reviewBuyButton(e) {
    
        e.preventDefault();
        this.reviewBuyTransaction()

        this.enableTransaction()
    }

    enableTransaction() {
        // if (this.state.proceed === 'buy') {

        // }
    }

    reviewBuyTransaction() {
      
        const shares = parseFloat(this.state.fragment);
        if (this.state.status === 'buy') {
            if (shares * this.props.props.currentPrice > this.props.props.user.funds) {
                this.setState({ error: 'buy' })
            } else {
                this.setState({ proceed: 'buy' })
            }
        } else {
            let temp = this.getPortfolio();
            let ticker = this.props.props.companyDescription.symbol;
            if (shares > temp[ticker]) {
                this.setState({ error: 'sell'})
            } else {
                this.setState({ proceed: 'sell' })
            }
        }
            
    }
    
    renderEstimatedCost() {
        const shares = parseFloat(this.state.fragment);
        if (shares > 0) {
            return (shares * this.props.props.currentPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        } else {
            return (0.00).toFixed(2)
        }
    }
    
    highlightTransactionSwitch(status) {
        if(this.state.status == status) {
            if(this.signReturn() === '+') {
                return 'transaction-switch-highlight-green'
            } else {
                return 'transaction-switch-highlight-red'
            }
            
        } else {
            if(this.signReturn() === '+') {
                return 'transaction-switch-none-green'
            } else {
                return 'transaction-switch-none-red'
            }
        }
    }

    transactionSwitch(e) {
        e.preventDefault();
       
        this.setState({status: e.currentTarget.value,
                        error: '',
                        proceed: ''})

    }

    signReturn() {
        if (this.props.state.portfolioValues.length > 0) {
            return ((((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close))
                / this.props.state.portfolioValues[0].close) >= 0 ? '+' : '')
        }
    }

    render() {
   
        if (this.props.props.currentPrice !== undefined) {
          
            return (
                <div className='transaction-table'>
                   
                    <div className='transaction-table-header'>
                        <div className='transaction-table-header-2'>
                            <button className={this.highlightTransactionSwitch('buy')} value='buy' onClick={this.transactionSwitch}>Buy {this.props.props.companyDescription.symbol}</button>
                            <button className={this.highlightTransactionSwitch('sell')} value='sell' onClick={this.transactionSwitch}>Sell {this.props.props.companyDescription.symbol}</button>
                        </div>
                    </div>
                  

                    <div className='transaction-table-mid-1'>
                        <div className='transaction-table-mid-1-shares'>
                            <div className='transaction-table-mid-1-shares-title'>Shares</div>
                            <div className='transaction-table-mid-1-shares-input'>
                                {this.searchField()}
                            </div>
                        </div>
                        <div className='transaction-table-mid-1-market'>
                            <div className={this.signReturn() === '+' ? 'market-price-title-green' : 'market-price-title-red'}>Market Price</div>
                            <div className='market-price'>${this.props.props.currentPrice}</div>
                        </div>

                    </div>

                    <div className='transaction-table-mid-2'>
                        <div className='estimated-cost'> 
                            <div className='estimated-cost-title'>{this.state.status === 'buy' ? 'Estimated Cost' : 'Estimated Credit'}</div>
                            <div>${this.renderEstimatedCost()}</div>

                        </div>
                        {this.renderError()}
                        

                        <button onClick={this.reviewBuyButton} className={this.signReturn() === '+' ? 'transaction-button-green' : 'transaction-button-red'}>{this.state.status === 'buy' ? 'Buy' : 'Sell'}</button>
                    </div>

                    <div className='transaction-table-bottom'>
                        {this.renderBottom()}
                    </div>
                </div>
            
            )
        } else {return null;}
    }
}

export default Transaction;