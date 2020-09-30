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
    }

    componentDidMount() {
        this.props.fetchTransactions().then(() => {
            this.getPortfolioPrices();
        })
    }

    
    getPortfolio() {
        const names = {};
       
        this.props.transactions.forEach(transaction => {
            if (names[transaction.ticker]) {
            names[transaction.ticker] += 1}
            else {names[transaction.ticker] = 1}
        });
        return names;
    }

    getPortfolioPrices() {
        const names = this.getPortfolio();
        const tickers = Object.keys(names).join(',')
      
        if (this.state.range === '1D') {
            this.props.fetchIntradayPrices(tickers)
        } else if (this.state.range === '1W') {
            this.props.fetchHistoricalPrices(tickers, '5d')
        } else if (this.state.range === '1M') {
            this.props.fetchHistoricalPrices(tickers, '1mm')
        } else if (this.state.range === '3M') {
            this.props.fetchHistoricalPrices(tickers, '3m')
        } else if (this.state.range === '1Y') {
            this.props.fetchHistoricalPrices(tickers, '1y')
        } else {this.props.fetchHistoricalPrices(tickers, 'max')}

        
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({range: e.target.value}, () => {
            this.getPortfolioPrices()
        });
    }

    highlightFrequency(freq) {
        if(this.state.range === freq) {
            return 'highlight-freq'
        } else {return 'non-highlight-freq'}
    }

    data() {
        if(Object.keys(this.props.prices).length === 0 ) {
            return []} else { return this.props.prices.AAPL['intraday-prices']}}
    
    

    render() {
        debugger
         
            const renderLineChart = (
                <LineChart width={676} height={196} data={this.data()} >
                    <Tooltip content={<CustomToolTip/>}/>
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
                    <button className={this.highlightFrequency('ALL')} value='ALL' onClick={this.handleClick}>ALL</button>
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