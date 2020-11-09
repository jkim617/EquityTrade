import React from 'react';
import Dashboard from '../../dashboard/dashboard';
import Portfolio from './portfolio/portfolio';
import News from './news/news';

class UserBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            range: '1D',
            portfolioValues: [],
            noFunds: false};

        this.getPortfolioPrices = this.getPortfolioPrices.bind(this);
        this.buildPortfolioValues = this.buildPortfolioValues.bind(this);
        this.getStockPrices = this.getStockPrices.bind(this);
        this.changeRange = this.changeRange.bind(this);
    }

    changeRange(newRange) {
    
        this.setState({ range: newRange }, () => {

            this.getPortfolioPrices().then(() => this.buildPortfolioValues())
        });
    }

    componentDidMount() {
  
        if(this.props.stockShow === undefined && this.props.user.funds != 0) {
          
            this.props.fetchTransactions().then(() => (
                this.getPortfolioPrices())).then(() => {

                    return this.buildPortfolioValues()
                })
        } 
        else {
            this.setState({ portfolioValues: [] })
        }
        
    }

    componentDidUpdate(prevProps) {
      
        if (this.props.stockShow === undefined ) {
            if((this.props.user.funds !== prevProps.user.funds)) {
            
                this.props.fetchTransactions().then(() => (
                    this.getPortfolioPrices())).then(() => {

                        return this.buildPortfolioValues()
                    })
            }
            else if (this.state.noFunds === false) {
                this.setState({ noFunds: true })
            }
        } 
        


    }
    
    getPortfolio() {
        const names = {};

        this.props.transactions.forEach(transaction => {
            if (names[transaction.ticker]) {
                names[transaction.ticker] += transaction.num_shares
            }
            else { names[transaction.ticker] = transaction.num_shares }
        });

        return names;
    }

    getStockPrices() {
        const ticker = this.props.stockShow.ticker
      
        if (this.state.range === '1D') {
            return this.props.fetchStockIntradayPrices(ticker)
        } else if (this.state.range === '1W') {
            return this.props.fetchStockHistoricalPrices(ticker, '5dm')
        } else if (this.state.range === '1M') {
            return this.props.fetchStockHistoricalPrices(ticker, '1mm')
        } else if (this.state.range === '3M') {
            return this.props.fetchStockHistoricalPrices(ticker, '3m')
        } else if (this.state.range === '1Y') {
            return this.props.fetchStockHistoricalPrices(ticker, '1y')
        } else { return this.props.fetchStockHistoricalPrices(ticker, 'max') }
    }

    getPortfolioPrices() {
        const names = this.getPortfolio();
        const tickers = Object.keys(names).join(',')

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
     
        const names = this.getPortfolio();
        const portfolio_values = {};
        const prices = this.props.prices;
        const finalized_portfolio = [];
        const namesArray = Object.keys(names);
        
        const num = () => {
            if (this.state.range === '1D') {
                return 5
            } else if (this.state.range === '1M') {
                return 2
            } else { return 1 }
        }

        if (this.state.range === '1D') {
            namesArray.map(name => {
                portfolio_values[name] = prices[name]['intraday-prices'].map(price => ({ time: price.label, close: price.close * names[name] }))
            })
        } else {
            namesArray.map(name => {
                portfolio_values[name] = prices[name]['chart'].map(price => ({ date: price.date, time: price.label, close: price.close * names[name] }))
            })
        }

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
     
        for (let i = 0; i < finalized_portfolio.length; i++) {
            finalized_portfolio[i].close += this.props.user.funds
        }
       
        this.setState({ portfolioValues: finalized_portfolio,
                        noFunds: true })
    }

    render() {
        if (this.props.stockShow === undefined) {
    
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
        else {
         
            return (
                <div/>
            )
        }
    }
}

export default UserBody;