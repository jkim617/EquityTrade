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
            portfolioValues: [],
            buyingPowerStatus: false,
            depositFormStatus: false,
            depositAmount: 0.00

        };
        this.handleBuyingClick = this.handleBuyingClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getPortfolioPrices = this.getPortfolioPrices.bind(this);
        this.buildPortfolioValues = this.buildPortfolioValues.bind(this);
        this.tooltipOffset = this.tooltipOffset.bind(this);
        this.handleDepositSubmit = this.handleDepositSubmit.bind(this);
        this.openDepositForm = this.openDepositForm.bind(this);
        this.closeDepositForm = this.closeDepositForm.bind(this);
 
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
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
        const monthNames = [
            "JAN", "FEB", "MAR",
            "APR", "MAY", "JUN", "JUL",
            "AUG", "SEP", "OCT",
            "NOV", "DEC"
        ];
        
        const convertDate = (date, time) => {
            let newDate = new Date(date);
            let day = newDate.getDate();
            let monthIndex = newDate.getMonth();
            let year = newDate.getFullYear();

            if (this.state.range === '3M') {
                return monthNames[monthIndex] + ' ' + day 
            } else if (this.state.range === '1Y') {
                return monthNames[monthIndex] + ' ' + day + "," + ' ' + year
            }

            let suffix = parseInt(time) >= 12 ? "PM" : "AM";
            let hours = ((parseInt(time) + 11) % 12 + 1) + time.slice(2) + ' ' + suffix

            return monthNames[monthIndex] + ' ' + day + ',' + ' ' + hours
        }
        
        
        const num = () => {
            if (this.state.range === '1D') {
                return 5
            } else if (this.state.range === '1M') {
                return 2
            } else {return 1}
        }

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
                        formattedDate: convertDate(portfolio_values[namesArray[0]][i].date, portfolio_values[namesArray[0]][i].time),
                        close: total
                    })
                }
            } 
            else {
                finalized_portfolio.push({
                    date: portfolio_values[namesArray[0]][i].date,
                    time: portfolio_values[namesArray[0]][i].time,
                    formattedDate: convertDate(portfolio_values[namesArray[0]][i].date, portfolio_values[namesArray[0]][i].time),
                    close: total
            })
            }
        }

        for (let i = 0; i < finalized_portfolio.length; i++) {
            finalized_portfolio[i].close += this.props.user.funds
        }
   
        this.setState({portfolioValues: finalized_portfolio})
    }
        
    handleClick(e) {
        e.preventDefault();
        this.setState({range: e.target.value}, () => {
          
            this.getPortfolioPrices().then(() => this.buildPortfolioValues())
        });
    }

    handleDepositSubmit(e) {
        e.preventDefault();
        const addAmount = this.state.depositAmount;

        this.setState({ depositAmount: 0.00 }, () => this.props.addFunds(addAmount, this.props.user.id));
    }

    openDepositForm(e) {
        e.preventDefault();
        this.setState({depositFormStatus: !this.state.depositFormStatus})
    }

    closeDepositForm(e) {
        e.preventDefault();
        this.setState({depositFormStatus: false, buyingPowerStatus: false})
    }

    handleBuyingClick(e) {
        e.preventDefault();
        this.setState({buyingPowerStatus: !this.state.buyingPowerStatus})
    }

    highlightFrequency(freq) {
        if(this.state.range === freq) {
            return 'highlight-freq'
        } else {return 'non-highlight-freq'}
    }

    tooltipOffset() {
        if (this.state.range === '1W' || this.state.range === '1M') {
            return -50
        } else if (this.state.range === '1D') {
            return -25
        } else if (this.state.range === '3M') {
            return -20
        } else {return -45}
    }

    cursorHover(e) {
        if (!e.activePayload) return null;
    }

    render() {
            const renderLineChart = (
                <LineChart width={676} height={196} data={this.state.portfolioValues}
                    onMouseMove={this.cursorHover}>
                    <Tooltip content={<CustomToolTip range={this.state.range}/>}
                        position={{y: 0}}
                        offset={this.tooltipOffset()}
                        isAnimationActive={false}
                        wrapperStyle={{ top: -19 }}
                        allowEscapeViewBox={{x:true, y: false}}
                    />
                    
                    <Line type="monotone" dataKey="close" 
                        strokeWidth={2} stroke={'#00C805'} dot={false}
                        
                    />
                    <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                </LineChart>
            );

        return (
            <div className='dashboard'>

                <div className={this.state.depositFormStatus ? 'deposit-form' : 'deposit-form-hidden'}>
                    <div className='deposit-form-title'>Deposit Funds</div>
                    <div className='deposit-form-amount'>
                        <div>Amount</div>
                        <input type='number' placeholder={'$0.00'}
                            value={this.state.depositAmount}
                            onChange={this.update('depositAmount')}
                            className='deposit-input'
                            required
                        />
                    </div>
                    <button className='deposit-submit' onClick={this.handleDepositSubmit}>Submit</button>
                    <button onClick={this.closeDepositForm}>
                        <img className='deposit-close' src="https://static.thenounproject.com/png/26894-200.png" alt=""/>
                        </button>

                </div>


                <div className='portfolio-balance' />
                <div className='main-chart'>{renderLineChart}</div>
                <div className='frequency-bar'>
                    <button className={this.highlightFrequency('1D')} value='1D' onClick={this.handleClick}>1D</button>
                    <button className={this.highlightFrequency('1W')} value='1W' onClick={this.handleClick}>1W</button>
                    <button className={this.highlightFrequency('1M')} value='1M' onClick={this.handleClick}>1M</button>
                    <button className={this.highlightFrequency('3M')} value='3M' onClick={this.handleClick}>3M</button>
                    <button className={this.highlightFrequency('1Y')} value='1Y' onClick={this.handleClick}>1Y</button>
                    <button className={this.highlightFrequency('ALL')} value='ALL'>ALL</button>
                </div>
                <div className={this.state.buyingPowerStatus ? 'buying-power-base' : 'buying-power-base-hidden'}>
                    <button onClick={this.handleBuyingClick} className='buying-power-container'>
                        <div className='buying-power'>Buying Power</div>
                        <div className={this.state.buyingPowerStatus ? 'funds-hidden' : 'funds'}>${this.props.user.funds.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
                    </button>
                    <div className={this.state.buyingPowerStatus ? 'buying-station' : 'buying-station-hidden'}>
                        <div className='buying-station-1'>
                            <div className='buying-station-1-1'>
                                <div className='buying-station-1-1-1'>Brokerage Cash</div>
                                <div className='buying-station-1-1-2'>${this.props.user.funds.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
                            </div>
                            <div className='buying-station-1-2'>
                                <div className='buying-station-1-2-1'>Buying Power</div>
                                <div className='buying-station-1-2-2'>${this.props.user.funds.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
                            </div>
                            <div className='buying-station-1-3'>
                                <div className='buying-margin'>Get More Buying Power with Margin</div>
                                <button onClick={this.openDepositForm} className='deposit-funds-button'>Deposit Funds</button>
                            </div>
                        </div>
                        <div className='buying-station-2'>
                            <div className='buying-station-2-1-container'>
                                <div className='buying-station-2-1'>Buying Power represents the total value of stocks you can purchase.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Dashboard;