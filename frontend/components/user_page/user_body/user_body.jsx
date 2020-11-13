import React from 'react';
import Dashboard from '../../dashboard/dashboard';
import Portfolio from './portfolio/portfolio';
import Transaction from './transaction/transaction';
import News from './news/news';
import About from './stock_about/about';

class UserBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            range: '1D',
            portfolioValues: [],
            noFunds: false,
            redirect: false,
            stockShow: false};

        this.getPortfolioPrices = this.getPortfolioPrices.bind(this);
        this.buildPortfolioValues = this.buildPortfolioValues.bind(this);
        this.getStockPrices = this.getStockPrices.bind(this);
        this.changeRange = this.changeRange.bind(this);
     
    }

    changeRange(newRange) {
        
        this.setState({ range: newRange})
        // this.setState({ range: newRange }, () => {

        //     this.getPortfolioPrices().then(() => this.buildPortfolioValues())
        // });
    }

    componentDidMount() {
    
        if(this.props.pathName === '/') {
            
            // if(this.props.user.funds != 0) {
                this.props.fetchTransactions().then(() => (
                    this.getPortfolioPrices())).then(() => {
                        return this.buildPortfolioValues()
                    })
            }
            // else {
            //     this.setState({ portfolioValues: [],
            //                     redirect: true })
            // }
        // } 
        else {
            const ticker = this.props.pathName.split('/')[2]
            
            this.props.fetchTransactions().then(() =>(
                this.props.fetchCompany(ticker).then(() => (
                    this.props.fetchCurrentPrice(ticker).then(() => (
                        this.getStockPrices().then(() => {
                            return this.buildPortfolioValues()
                        })
                    ))

                )
                )
            ))
            
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
      
        const ticker = this.props.pathName.split('/')[2]
        if (this.props.pathName === '/' ) {
        
            if ((this.props.user.funds !== prevProps.user.funds) || (this.state.range !== prevState.range)) {
           
                this.props.fetchTransactions().then(() => (
                    this.getPortfolioPrices())).then(() => {

                        return this.buildPortfolioValues()
                    })
            }
            else if (this.state.noFunds === false) {
                this.setState({ noFunds: true })
            }
        } else if (this.state.range !== prevState.range || this.props.pathName !== prevProps.pathName) {
           
            this.props.fetchCompany(ticker).then(() => (
                this.props.fetchCurrentPrice(ticker).then(() => (
                    this.getStockPrices().then(() => {
                        return this.buildPortfolioValues()
                    })
                ))

            )
                
                
            )
            
        }
        


    }
    
    getPortfolio() {
        const names = {};

        // this.props.transactions.forEach(transaction => {
        //     if (names[transaction.ticker]) {
        //         names[transaction.ticker] += transaction.num_shares
        //     }
        //     else { names[transaction.ticker] = transaction.num_shares }
        // });

        this.props.transactions.forEach(transaction => {
            if (names[transaction.ticker]) {
                if (transaction.order_type === 'buy') {
                    names[transaction.ticker] += transaction.num_shares
                } else {
                    names[transaction.ticker] -= transaction.num_shares
                }
            }
            else {
                if (transaction.order_type === 'buy') {
                    names[transaction.ticker] = transaction.num_shares
                } else {
                    names[transaction.ticker] = transaction.num_shares * -1
                }
            }
        });

        return names;
    }

    getStockPrices() {
        const ticker = this.props.pathName.split('/')[2]
   
        if (this.state.range === '1D') {
            return this.props.fetchIntradayPrices(ticker)
        } else if (this.state.range === '1W') {
            return this.props.fetchHistoricalPrices(ticker, '5dm')
        } else if (this.state.range === '1M') {
            return this.props.fetchHistoricalPrices(ticker, '1mm')
        } else if (this.state.range === '3M') {
            return this.props.fetchHistoricalPrices(ticker, '3m')
        } else if (this.state.range === '1Y') {
            return this.props.fetchHistoricalPrices(ticker, '1y')
        } else { return this.props.fetchHistoricalPrices(ticker, 'max') }
    }

    getPortfolioPrices() {
        const names = this.getPortfolio();
        const tickers = Object.keys(names).join(',')
     
        if (Object.keys(names).length === 0) {return null;};
      
        if (this.state.range === '1D') {
            return this.props.fetchIntradayPrices(tickers)
        } else if (this.state.range === '1W') {
            return this.props.fetchHistoricalPrices(tickers, '5dm')
        } else if (this.state.range === '1M') {
            return this.props.fetchHistoricalPrices(tickers, '1mm')
        } else if (this.state.range === '3M') {
            return this.props.fetchHistoricalPrices(tickers, '3m')
        } else if (this.state.range === '1Y') {
            return this.props.fetchHistoricalPrices(tickers, '1y')
        } else { return this.props.fetchHistoricalPrices(tickers, 'max') }

    }

    convertDate(date, time) {
        let newDate = new Date(date);
        let day = newDate.getDate();
        let monthIndex = newDate.getMonth();
        let year = newDate.getFullYear();

        const monthNames = [
            "JAN", "FEB", "MAR",
            "APR", "MAY", "JUN", "JUL",
            "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ];

        if (this.state.range === '3M') {
            return monthNames[monthIndex] + ' ' + day
        } else if (this.state.range === '1Y') {
            return monthNames[monthIndex] + ' ' + day + "," + ' ' + year
        }

        let suffix = parseInt(time) >= 12 ? "PM" : "AM";
        let hours = ((parseInt(time) + 11) % 12 + 1) + time.slice(2) + ' ' + suffix

        return monthNames[monthIndex] + ' ' + day + ',' + ' ' + hours
    }

    
    buildPortfolioValues() {
     
        const ticker = this.props.pathName.split('/')[2];
        const portfolio_values = {};
        const prices = this.props.prices;
        const finalized_portfolio = [];
        let namesArray;
        let names;
        if (this.props.pathName === '/') {
            names = this.getPortfolio()
            namesArray = Object.keys(names)
        } else {
            namesArray = [ticker]}
        ;
           
        if (namesArray.length === 0 ) {this.setState({redirect: true})};
        
        
        const num = () => {
            if (this.state.range === '1D') {
                return 5
            } else if (this.state.range === '1M') {
                return 2
            } else { return 1 }
        }
   

        if (this.state.range === '1D') {
            if (ticker === undefined) {
                namesArray.map(name => {
                    portfolio_values[name] = prices[name]['intraday-prices'].map(price => ({ time: price.label, close: price.close * names[name] }))
            })
            } else {
                namesArray.map(name => {
                    portfolio_values[name] = prices[name]['intraday-prices'].map(price => ({ time: price.label, close: price.close }))
            })}
        } else {
            if (ticker === undefined) {
                namesArray.map(name => {
                    portfolio_values[name] = prices[name]['chart'].map(price => ({ date: price.date, time: price.label, close: price.close * names[name] }))
                })
            } else {
                namesArray.map(name => {
                    portfolio_values[name] = prices[name]['chart'].map(price => ({ time: price.label, close: price.close }))
            })
        }}

        for (let i = 0; i < portfolio_values[namesArray[0]].length; i += num()) {
            let total = 0;
            for (let j = 0; j < namesArray.length; j++) {
                total += portfolio_values[namesArray[j]][i].close
            }

            if (this.state.range === '1D') {
                finalized_portfolio.push({
                    time: portfolio_values[namesArray[0]][i].time,
                    close: total
                })
            }
            else if (this.state.range === '1M') {
                if (portfolio_values[namesArray[0]][i].time.endsWith("00")) {
                    finalized_portfolio.push({
                        date: portfolio_values[namesArray[0]][i].date,
                        time: portfolio_values[namesArray[0]][i].time,
                        formattedDate: this.convertDate(portfolio_values[namesArray[0]][i].date, portfolio_values[namesArray[0]][i].time),
                        close: total
                    })
                }
            }
            else {
                finalized_portfolio.push({
                    date: portfolio_values[namesArray[0]][i].date,
                    time: portfolio_values[namesArray[0]][i].time,
                    formattedDate: this.convertDate(portfolio_values[namesArray[0]][i].date, portfolio_values[namesArray[0]][i].time),
                    close: total
                })
            }
        }
        if (ticker === undefined) {
            for (let i = 0; i < finalized_portfolio.length; i++) {
                finalized_portfolio[i].close += this.props.user.funds
        }}
       
        this.setState({ portfolioValues: finalized_portfolio,
                        noFunds: true,
                        redirect: true })
    }

    render() {
    
        if (this.props.pathName === '/' && this.state.redirect === true) {
            
                return (
                    <div className='user-body'>
                        <div className='user-body-container'>
                            <div className='user-body-left'>
                                <Dashboard props={this.props} state={this.state} changeRange={this.changeRange}/>
                                <div className='news'>
                                    <News state={this.state}/>
                                </div>
                            </div>
                            <div className='user-body-right'>
                                <Portfolio props={this.props} state={this.state}/>
                            </div>
                        </div>
                    </div>
                )
         }
        else if(this.props.pathName != '/') {
         
            return (
                <div className='user-body'>
                    <div className='user-body-container'>
                        <div className='user-body-left'>
                            <Dashboard props={this.props} state={this.state} changeRange={this.changeRange} />
                            <div className='news'>
                                <About props={this.props} state={this.state}/>
                            </div>
                            <div className='news'>
                                <News state={this.state}/>
                            </div>
                        </div>
                        <div className='user-body-right'>
                           <Transaction props={this.props} state={this.state}/>
                        </div>
                    </div>
                   
                </div>
            )
        }
        return null;
    }
}

export default UserBody;