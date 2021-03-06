import React from 'react';
import { Link } from 'react-router-dom';

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

        Object.keys(names).forEach(ticker => {
            if (names[ticker] === 0) {
                delete names[ticker]
            }
        })

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

    checkUndefined(data) {
        for (let i = data.length-1; i >= 0; i --) {
            if (data[i].close !== null) {
                return data[i].close
            }
        }
        return 0
    }
    
    renderPortfolioList() {
        
        const names = this.getPortfolio();

        const arrayNames = Object.keys(names);

        if (arrayNames.length === 0) {return(
            <div className='placeholder'>Get started by adding "Buying Power" or searching for stocks through the searchbar!</div>
        ) 
            }

        if (Object.keys(this.props.props.prices).length > 0) {
            const keyRange = this.props.props.prices[arrayNames[0]]['intraday-prices'] === undefined ? 'chart' : 'intraday-prices'
            
            if (this.props.props.prices === undefined || arrayNames.length === 0) {
                return(
                    <div className='placeholder'>
                    </div>
                ) 
                }
            
            return arrayNames.map((name, i) => {
                
            
                return (
                    <Link to={`/stocks/${name}`}>
                    <div className='portfolio-stock-name' key={i}>
                        <div className='portfolio-stock-name-1'>
                            <div className='stock-name'>{name}</div>
                            <div className='stock-num-shares'>{names[name]} Shares </div>
                        </div>
                        <div className='portfolio-stock-name-2'>
                            {this.renderLineChart(this.props.props.prices[name][keyRange])}
                        </div>
                        <div className='portfolio-stock-name-3'>
                            <div>${this.checkUndefined(this.props.props.prices[name][keyRange]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
                            
                                <div className={(((this.checkUndefined(this.props.props.prices[name][keyRange]))
                                - (this.props.props.prices[name][keyRange][0].close))
                                / (this.props.props.prices[name][keyRange][0].close)) >= 0 ? 'positive-return' : 'negative-return'}>
                                {(((this.props.props.prices[name][keyRange].slice(-1)[0].close)
                                    - (this.props.props.prices[name][keyRange][0].close))
                                    / (this.props.props.prices[name][keyRange][0].close)) >= 0 ? '+' : ''}
                                    {
                                        parseFloat((((this.checkUndefined(this.props.props.prices[name][keyRange])) 
                                    - (this.props.props.prices[name][keyRange][0].close))
                                    / (this.props.props.prices[name][keyRange][0].close))*100).toFixed(2)+'%'
                                }
                            </div>
                        </div>     
                    </div>
                    </Link>
                )
            }) 
        }
    }

    renderWatchList() {
        
    }


    render() {
        return (
            <div className='portfolio-dashboard'>
                <div className='portfolio-dashboard-stocks'>
                    <div className='portfolio-dashboard-title'>Stocks</div>
                    {this.renderPortfolioList()}
                </div>

                <div className='portfolio-dashboard-stocks'>
                    <div className='portfolio-dashboard-title'>List</div>
                    <div className='placeholder'></div>
                </div>

            </div>
        )
    }
}

export default Portfolio;