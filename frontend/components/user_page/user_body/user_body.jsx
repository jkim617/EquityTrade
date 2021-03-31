import React from 'react';
import { LoopCircleLoading } from 'react-loadingg';

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
            stockShow: false,
        fetchInProgress: false,
        fetchInProgressChart: false};
           
        this.getPortfolioPrices = this.getPortfolioPrices.bind(this);
        this.buildPortfolioValues = this.buildPortfolioValues.bind(this);
        this.getStockPrices = this.getStockPrices.bind(this);
        this.changeRange = this.changeRange.bind(this);
     
    }

   

    changeRange(newRange) {
        
        this.setState({ range: newRange,
                            fetchInProgressChart: true})
        // this.setState({ range: newRange }, () => {

        //     this.getPortfolioPrices().then(() => this.buildPortfolioValues())
        // });
    }

    componentDidMount() {
    
        if(this.props.pathName === '/') {
                this.setState ({fetchInProgress: true}, () => {
                    this.props.fetchGeneralNews().then(() => (
                        this.props.fetchTransactions())).then(() => (
                            this.getPortfolioPrices())).then(() => {
                                return this.buildPortfolioValues()
                            })
                })
                
            
            // if(this.props.user.funds != 0) {
            
            
                
            }
            // else {
            //     this.setState({ portfolioValues: [],
            //                     redirect: true })
            // }
        // } 
        else {
            const ticker = this.props.pathName.split('/')[2]
            
            this.setState({fetchInProgress: true}, () => {
                this.props.fetchStockNews(ticker).then(() => (
                    this.props.fetchTransactions()
                )).then(() => (
                    this.props.fetchCompany(ticker))).then(() => (this.props.fetchCompanyStats(ticker)))
                    .then(() => (
                        this.props.fetchCurrentPrice(ticker))).then(() => (
                            this.getStockPrices())).then(() => {
                                return this.buildPortfolioValues()
                            })
                        

                    
                    
                
            })
            
            
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
      
        const ticker = this.props.pathName.split('/')[2]
        if (this.props.pathName === '/' ) {
        
            if ((this.props.user.funds !== prevProps.user.funds)) {
                this.setState({fetchInProgressChart: true}, () => {
                    this.props.fetchTransactions()

                        .then(() => (
                            this.getPortfolioPrices())).then(() => {

                                return this.buildPortfolioValues()
                            })
                })
               
                
            } else if (this.state.range !== prevState.range) {
                this.props.fetchTransactions()
                    .then(() => (
                        this.getPortfolioPrices())).then(() => {

                            return this.buildPortfolioValues()
                        })
            }
            else if (this.state.noFunds === false) {
                this.setState({ noFunds: true })
            }
        } else {
            if (this.state.range !== prevState.range) {
                this.props.fetchCompany(ticker).then(() => (
                    this.props.fetchCurrentPrice(ticker)
                )).then(() => (this.props.fetchCompanyStats(ticker)))
                .then(() => (this.props.fetchCurrentPrice(ticker)))
                .then(() => (
                    this.getStockPrices())).then(() => {
                        return this.buildPortfolioValues()
                    })
                

            }
            else if (this.props.pathName !== prevProps.pathName) {
                this.setState({range: '1D'}, () => {
                    this.props.fetchStockNews(ticker).then(() => (
                        this.props.fetchCompany(ticker)
                    )).then(() => (this.props.fetchCompanyStats(ticker)))
                        .then(() => (
                            this.props.fetchCurrentPrice(ticker))).then(() => (
                                this.getStockPrices())).then(() => {
                                    return this.buildPortfolioValues()
                                })
                })
                
            }
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
        if (this.props.transactions === undefined || (this.props.transactions && this.props.transactions.length === 0)) {return true;}
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
        
        if (this.props.transactions === undefined || (this.props.transactions && this.props.transactions.length === 0)) {
            this.setState({
                redirect: true,
                fetchInProgress: false,
                fetchInProgressChart: false
            }, () => { return })
        };
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
                    portfolio_values[name] = prices[name]['chart'].map(price => ({ date: price.date, time: price.label, close: price.close }))
            })
        }}
  
        for (let i = 0; i < portfolio_values[namesArray[0]].length; i += num()) {
            let total = 0;
            for (let j = 0; j < namesArray.length; j++) {
                if (portfolio_values[namesArray[j]][i] !== undefined) {
                    total += portfolio_values[namesArray[j]][i].close
                }
                
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
                        redirect: true,
                        fetchInProgress: false,
                        fetchInProgressChart: false })
    }

    renderLoading() {
        if (this.state.fetchInProgress === true) {
            return (
                <div className='spinner'>
                    <LoopCircleLoading color='#00C805'/>
                </div>
            )
        }
        else {
            if (this.props.pathName !== '/') {
                return (
                <div>API doesn't support this ticker.. :( Please search for different stock.</div>
   
            )
            }
            
        }
    }

    getOriginalCost(curr_ticker) {
        let buyCost = 0;
        let sellCost = 0;
        let transactions = this.props.transactions;

        for (let i = 0; i < transactions.length; i ++) {
            let transaction = transactions[i]
            if (transaction.ticker === curr_ticker) {
                if (transaction['order_type'] === 'buy') {
                    buyCost += (transaction.price * transaction['num_shares'])
                } else {
                    sellCost += (transaction.price * transaction['num_shares'])
                }
            } 
        }

        let trueCost = buyCost - sellCost

        return trueCost

      
    }

    renderStockInfo() {
        if (this.props.companyDescription === undefined ) {
            return null;
        }
        const names = this.getPortfolio();
        const ticker = this.props.companyDescription.symbol;
        const shareNums = ticker in names ? names[ticker] : 0;

        if (this.props.currentPrice != undefined) {
            const marketValue = this.props.currentPrice * shareNums;
            const cost = this.getOriginalCost(ticker);
            const totalReturn = marketValue - cost
            return (
                <div className='stock-user-info'>
                    <div className='stock-user-info-header'>
                        Your Market Value
                    </div>
                    <div className='stock-user-info-market-value'>
                        ${marketValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </div>
                    <div className='stock-user-details'>
                        <div>Cost</div>
                        <div>${shareNums > 0 ? cost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '0.00'}</div>
                    </div>
                    <div className='stock-user-details'>
                        <div>Total Return</div>
                        <div>{totalReturn > 0 ? '+' : '-'}{'$' + (Math.abs(totalReturn)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                            {totalReturn > 0 ? '(+' : '('}{(((marketValue - cost) / cost) * 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '%)'}</div>
                    </div>
                    <div className='stock-user-details-last'>
                        <div>Shares</div>
                        <div>{shareNums}</div>
                    </div>
        
                </div>
            )
        }
    }

    render() {
      
        if (this.props.pathName === '/' && this.state.redirect === true) {
            
                return (
                    <div className='user-body'>
                        {this.renderLoading()}
                        <div className='user-body-container'>
                            <div className='user-body-left'>
                                <Dashboard props={this.props} state={this.state} changeRange={this.changeRange}/>
                                <div className='news'>
                                    <News props = {this.props} state={this.state} renderNews={this.renderNews}/>
                                    
                                </div>
                            </div>
                            <div className='user-body-right'>
                                <Portfolio props={this.props} state={this.state}/>
                            </div>
                        </div>
                    </div>
                )
         }
        else if(this.props.pathName != '/' ) {
         
            return (
                <div className='user-body'>
                
                    <div className='user-body-container'>
                        <div className='user-body-left'>
                            <Dashboard props={this.props} state={this.state} changeRange={this.changeRange} />
                            <div className='user-stock-box'>
                                
                                {this.renderStockInfo()}
                            </div>
                            <div className='news'>
                                <About props={this.props} state={this.state}/>
                            </div>
                            <div className='news'>
                                <News props={this.props} state={this.state} renderNews={this.renderNews}/>
                                
                            </div>
                        </div>
                        <div className='user-body-right'>
                           <Transaction props={this.props} state={this.state}/>
                        </div>
                        
                    </div>
                   
                </div>
            )
        }
        else {
            return (
                <div className='loading-screen'>
                    {this.renderLoading()}
                </div>

            );
        }
        
    }
}

export default UserBody;