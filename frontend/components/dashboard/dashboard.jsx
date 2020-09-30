import React from 'react';

import { LineChart,
        Line,
        XAxis,
        YAxis,
        Tooltip,
        ResponsiveContainer } from 'recharts';
import CustomToolTip from './custom_tooltip';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: '1D',
            portfolioValues: []

        };
        this.handleClick = this.handleClick.bind(this);
        this.getPortfolioPrices = this.getPortfolioPrices.bind(this);
        this.buildPortfolioValues = this.buildPortfolioValues.bind(this);
    }

    componentDidMount() {
        this.props.fetchTransactions().then(() => (
            this.getPortfolioPrices())).then(() => {
             
                return this.buildPortfolioValues()})
        }

    
    getPortfolio() {
        const names = {};
       
        this.props.transactions.forEach(transaction => {
            if (names[transaction.ticker]) {
            names[transaction.ticker] += transaction.num_shares}
            else {names[transaction.ticker] = transaction.num_shares}
        });

        return names;
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
        } else {return this.props.fetchHistoricalPrices(tickers, 'max')}

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
            } else {return 1}
        }

        debugger

        if (this.state.range === '1D') {
            namesArray.map(name => {
                portfolio_values[name] = prices[name]['intraday-prices'].map(price => ({time: price.label, close: price.close * names[name] }))
        })} else {
            namesArray.map(name => {
                portfolio_values[name] = prices[name]['chart'].map(price => ({ date: price.date, time: price.label, close: price.close * names[name] }))
        })} 
        


        for (let i = 0; i < portfolio_values[namesArray[0]].length; i += num()) {
        
            let total = 0;
            for (let j = 0; j < namesArray.length; j++) {
                total += portfolio_values[namesArray[j]][i].close
            }

            if (this.state.range === '1D') {
                finalized_portfolio.push({
                                        time: portfolio_values[namesArray[0]][i].time,
                                        close: total})}
            else if (this.state.range === '1M') {
                if (portfolio_values[namesArray[0]][i].time.endsWith("00")) {
                    finalized_portfolio.push({
                        date: portfolio_values[namesArray[0]][i].date,
                        time: portfolio_values[namesArray[0]][i].time,
                        close: total
                    })
                }
            } 
            else {
                finalized_portfolio.push({
                    date: portfolio_values[namesArray[0]][i].date,
                    time: portfolio_values[namesArray[0]][i].time,
                    close: total
            })
            }
        }

   
        this.setState({portfolioValues: finalized_portfolio})
    }
        
    handleClick(e) {
        e.preventDefault();
        this.setState({range: e.target.value}, () => {
          
            this.getPortfolioPrices().then(() => this.buildPortfolioValues())
        });
    }



    highlightFrequency(freq) {
        if(this.state.range === freq) {
            return 'highlight-freq'
        } else {return 'non-highlight-freq'}
    }

    render() {
       
            const renderLineChart = (
                <LineChart width={676} height={196} data={this.state.portfolioValues} >
                    <Tooltip content={<CustomToolTip range={this.state.range}/>}/>
                    <Line type="monotone" dataKey="close" stroke="green" dot={false}  />
                    <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                </LineChart>
            );

        return (
            <div>
                <div>{renderLineChart}</div>
                <div className='frequency-bar'>
                    <button className={this.highlightFrequency('1D')} value='1D' onClick={this.handleClick}>1D</button>
                    <button className={this.highlightFrequency('1W')} value='1W' onClick={this.handleClick}>1W</button>
                    <button className={this.highlightFrequency('1M')} value='1M' onClick={this.handleClick}>1M</button>
                    <button className={this.highlightFrequency('3M')} value='3M' onClick={this.handleClick}>3M</button>
                    <button className={this.highlightFrequency('1Y')} value='1Y' onClick={this.handleClick}>1Y</button>
                    <button className={this.highlightFrequency('ALL')} value='ALL'>ALL</button>
                </div>
                <div className='buying-power-container'>
                    <div className='buying-power'>Buying Power</div>
                    <div className='funds'>${this.props.user.funds}</div>
                </div>
                
                
    
                
            </div>

        )
    }
}

export default Dashboard;