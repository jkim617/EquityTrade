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
            buyingPowerStatus: false,
            depositFormStatus: false,
            depositAmount: 0.00,
            value: 0,
            return_dollar: 0,
            return_perc: 0,
            status: true

        };

        this.handleBuyingClick = this.handleBuyingClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.tooltipOffset = this.tooltipOffset.bind(this);
        this.handleDepositSubmit = this.handleDepositSubmit.bind(this);
        this.openDepositForm = this.openDepositForm.bind(this);
        this.closeDepositForm = this.closeDepositForm.bind(this);
        this.showBalance = this.showBalance.bind(this);
        this.showLastBalance = this.showLastBalance.bind(this);
      
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleClick(e) {
        e.preventDefault();
       
        this.setState({status: true}, this.props.changeRange(e.target.value))
    }

    handleDepositSubmit(e) {
        e.preventDefault();
        const addAmount = this.state.depositAmount;

        this.setState({ depositAmount: 0.00, depositFormStatus: false, buyingPowerStatus: false}, () => this.props.props.addFunds(addAmount, this.props.props.user.id));
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
     
        if(this.props.state.range === freq) {
            if (this.signReturn() === '+') {
            
                return 'highlight-freq'
            } else { 
                return 'highlight-freq-red'}
        } else {return 'non-highlight-freq'}
    }

    tooltipOffset() {
        if (this.props.state.range === '1W' || this.props.state.range === '1M') {
            return -50
        } else if (this.props.state.range === '1D') {
            return -25
        } else if (this.props.state.range === '3M') {
            return -20
        } else {return -45}
    }

    rangeString() {
        if (this.props.state.range === '1D') {
            return 'Today'
        } else if (this.props.state.range === '1W') {
            return 'Past Week'
        } else if (this.props.state.range === '1M') {
            return 'Past Month'
        } else if (this.props.state.range === '3M') {
            return 'Past 3 Months'
        } else if (this.props.state.range === '1Y') {
            return 'Past Year'
        }
    }

    signReturn() {
        if (this.props.state.portfolioValues.length > 0) {
            return ((((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close))
                / this.props.state.portfolioValues[0].close) >= 0 ? '+' : '')
        }
        
    }

    

    showBalance(e)  {
        const return_dollar = e.value-this.props.state.portfolioValues[0].close;
        const return_perc = return_dollar/this.props.state.portfolioValues[0].close;
     
        this.setState({value: e.value,
                        return_dollar: return_dollar,
                        return_perc: return_perc,
                        status: false})
     
        // this.setState({value: e.activePayload[0].payload.valuation})
        // this.setState({value: e.value})
    }

    showLastBalance() {

        this.setState({
                        status: true})
    }

    renderDepositForm() {
        if (this.props.props.pathName === '/') {
            return(
                <div className={this.state.depositFormStatus ? 'deposit-form' : 'deposit-form-hidden'}>
                    <div className='deposit-form-title'>Deposit Funds</div>
                    <div className='deposit-form-amount'>
                        <div>Amount</div>
                        <input type='number' placeholder={'$0.00'}
                            value={this.state.depositAmount === 0.00 ? '' : this.state.depositAmount}
                            onChange={this.update('depositAmount')}
                            className='deposit-input'
                            required
                        />
                    </div>
                    <button className='deposit-submit' onClick={this.handleDepositSubmit}>Submit</button>
                    <button onClick={this.closeDepositForm}>
                        <img className='deposit-close' src="https://static.thenounproject.com/png/26894-200.png" alt="" />
                    </button>
                </div>
            )
        }
    }

    renderBuyingPower() {
        if (this.props.props.pathName === '/') {
            return(
                <div className={this.state.buyingPowerStatus ? 'buying-power-base' : 'buying-power-base-hidden'}>
                    <button onClick={this.handleBuyingClick} className='buying-power-container'>
                        <div className='buying-power'>Buying Power</div>
                        <div className={this.state.buyingPowerStatus ? 'funds-hidden' : 'funds'}>${this.props.props.user.funds.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
                    </button>
                    <div className={this.state.buyingPowerStatus ? 'buying-station' : 'buying-station-hidden'}>
                        <div className='buying-station-1'>
                            <div className='buying-station-1-1'>
                                <div className='buying-station-1-1-1'>Brokerage Cash</div>
                                <div className='buying-station-1-1-2'>${this.props.props.user.funds.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
                            </div>
                            <div className='buying-station-1-2'>
                                <div className='buying-station-1-2-1'>Buying Power</div>
                                <div className='buying-station-1-2-2'>${this.props.props.user.funds.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
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
            ) 
        }
    }

    renderPortfolioBalance() {
        
        if (this.props.state.portfolioValues.length > 0) {
            if (isNaN(this.props.state.portfolioValues[0].close)) {
                return(<div>Not Available in US</div>)
            } else {
                if (this.state.status === false) {
                    return('$' + this.state.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
                } else {
                    return('$' + this.props.state.portfolioValues[0].close.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
                }
            }
        } else if (this.props.props.pathName === '/') {
            return('$' + this.props.props.user.funds.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
        } else {
            return(<div>N/A in US</div>)
        }
        
    }

    render() {
     
            const renderLineChart = (
                <LineChart width={676} height={196} data={this.props.state.portfolioValues}>
                    <Tooltip content={<CustomToolTip range={this.props.state.range}/>}
                        position={{y: 0}}
                        offset={this.tooltipOffset()}
                        isAnimationActive={false}
                        wrapperStyle={{ top: -20 }}
                        allowEscapeViewBox={{x:true, y: false}}
                    />
                    
                    <Line type="monotone" dataKey="close" 
                        strokeWidth={2} stroke={this.signReturn() === '+' ? '#00C805' : '#FF5000' } dot={false}  
                        activeDot={{onMouseMove: (e) => this.showBalance(e),
                                    onMouseLeave: (e) => this.showLastBalance(e)
                                }}
                        />
                    <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                </LineChart>
            );
        
        if (this.props.state.portfolioValues.length > 0) {
            const return_last_dollar = this.props.state.portfolioValues[0].close.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            const full_return_dollar = ((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close));
            const full_return_perc = (((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close))
            / this.props.state.portfolioValues[0].close)}
        
       
       
            return (
                
                <div>
                {this.renderDepositForm()}
                <div className='dashboard'>
            
                    <div className='portfolio-tooltip'>
                            {this.props.props.companyDescription !== undefined && this.props.props.companyDescription.symbol === this.props.props.pathName.split('/')[2] ? <div className='portfolio-tooltip-stockname'>{this.props.props.companyDescription.companyName.split(/,| /)[0]}</div> : ''}
                        <div className='portfolio-balance'>
    
                            {this.renderPortfolioBalance()}
                                {/* ${this.props.state.portfolioValues.length > 0  ? 
                                    // (this.props.state.portfolioValues[0].close === NaN) ? 'This stock is not available on this platform':
                                    (this.state.status === false? 
                                        this.state.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : this.props.state.portfolioValues[0].close.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                                )
                                    : this.props.props.user.funds.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} */}
                        </div>
                        <div className='portfolio-return'>
                                {this.props.state.portfolioValues.length > 0 ?
                                (!this.state.status ?
                                    (
                                    (this.state.return_perc > 0 ? '+' : '-') + '$' + 
                                    Math.abs(parseFloat(this.state.return_dollar)).toFixed(2)
                                    
                                    + ' (' + (this.state.return_perc > 0 ? '+' : '') + 
                                    
                                        parseFloat(
                                        (this.state.return_perc)*100
                                        ).toFixed(2) + '%) ' ) :

                                        (
                                            (((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close)) > 0 ? '+' : '-') + '$' +
                                            Math.abs(((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close))).toFixed(2)

                                            + ' (' + (((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close)) > 0 ? '+' : '') +

                                            parseFloat(
                                                ((((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close))
                                                    / this.props.state.portfolioValues[0].close)) * 100
                                            ).toFixed(2) + '%) ')
                                        
                                        ) : '' }
                                        <span className='range-string'>{this.rangeString()}</span>
                        </div>
                    </div>
                    <div className={this.props.state.range === '1D' ? 'main-chart-1d' : 'main-chart-rest'}>{renderLineChart}</div>
                    <div className={this.signReturn() === '+' ? 'frequency-bar' : 'frequency-bar-red'}>
                        <button className={this.highlightFrequency('1D')} value='1D' onClick={this.handleClick}>1D</button>
                        <button className={this.highlightFrequency('1W')} value='1W' onClick={this.handleClick}>1W</button>
                        <button className={this.highlightFrequency('1M')} value='1M' onClick={this.handleClick}>1M</button>
                        <button className={this.highlightFrequency('3M')} value='3M' onClick={this.handleClick}>3M</button>
                        <button className={this.highlightFrequency('1Y')} value='1Y' onClick={this.handleClick}>1Y</button>
                        {/* <button className={this.highlightFrequency('ALL')} value='ALL'>ALL</button> */}
                    </div>
                    {this.renderBuyingPower()}

                </div>
                </div>
            )
        
    }
}

export default Dashboard;