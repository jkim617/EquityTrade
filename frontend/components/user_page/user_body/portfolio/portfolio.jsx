import React from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

class Portfolio extends React.Component {
    constructor(props) {
        super(props) 
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

    renderLineChart(data) {
    
        return(
            <div className='portfolio-chart-icon-container'>
                <LineChart width={60} height={21} data={data}>
                    <Line type="monotone" dataKey="close"
                        strokeWidth={0.7} stroke={data.length > 0 ? (data.slice(-1)[0].close > data[0].close ? '#00C805' 
                            : '#FF5000') : ''} dot={false}
                    />
                    <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                </LineChart>
            </div>
                )      
    }
    
    renderPortfolioList() {
        debugger
        const names = this.getPortfolio();

        const arrayNames = Object.keys(names);

        if (Object.keys(this.props.props.prices).length > 0) {
            const keyRange = this.props.props.prices[arrayNames[0]]['intraday-prices'] === undefined ? 'chart' : 'intraday-prices'
            
            if (this.props.props.prices === undefined || arrayNames.length === 0) {return  }
        
            return arrayNames.map((name, i) => {

            
                return (
                    <div className='portfolio-stock-name' key={i}>
                        <div className='portfolio-stock-name-1'>
                            <div className='stock-name'>{name}</div>
                            <div className='stock-num-shares'>{names[name]} Shares </div>
                        </div>
                        <div className='portfolio-stock-name-2'>
                            {this.renderLineChart(this.props.props.prices[name][keyRange])}
                        </div>
                        <div className='portfolio-stock-name-3'>
                            <div>${this.props.props.prices[name][keyRange].slice(-1)[0].close.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
                            
                            <div className={(((this.props.props.prices[name][keyRange].slice(-1)[0].close)
                                - (this.props.props.prices[name][keyRange][0].close))
                                / (this.props.props.prices[name][keyRange][0].close)) >= 0 ? 'positive-return' : 'negative-return'}>
                                {(((this.props.props.prices[name][keyRange].slice(-1)[0].close)
                                    - (this.props.props.prices[name][keyRange][0].close))
                                    / (this.props.props.prices[name][keyRange][0].close)) >= 0 ? '+' : ''}
                                    {
                                parseFloat((((this.props.props.prices[name][keyRange].slice(-1)[0].close) 
                                    - (this.props.props.prices[name][keyRange][0].close))
                                    / (this.props.props.prices[name][keyRange][0].close))*100).toFixed(2)+'%'
                                }
                            </div>
                        </div>

                        
                        
                    </div>
                )
            }) 
        }
    }


    render() {
        return (
            <div className='portfolio-dashboard'>
                <div className='portfolio-dashboard-stocks'>
                    <div className='portfolio-dashboard-title'>Stocks</div>
                    {this.renderPortfolioList()}
                </div>

            </div>
        )
    }
}

export default Portfolio;