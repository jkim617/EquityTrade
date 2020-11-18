import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    signReturn() {
        if (this.props.state.portfolioValues.length > 0) {
            return ((((this.props.state.portfolioValues.slice(-1)[0].close) - (this.props.state.portfolioValues[0].close))
                / this.props.state.portfolioValues[0].close) >= 0 ? '+' : '')
        }
    }

    renderCompanyFacts() {
        const company = this.props.props.companyDescription
        return(
            <div className='company-facts-2'>
                <div className='company-facts-3'>
                    <div className='title'>CEO</div>
                    {company['CEO']}
                </div>

                <div className='company-facts-3'>
                    <div className='title'>Employees</div>
                    {company['employees']}
                </div>

                <div className='company-facts-3'>
                    <div className='title'>Headquarters</div>
                    {company['city'] + ', ' + company['state']}
                </div>

                <div className='company-facts-3'>
                    <div className='title'>Industry</div>
                    {company['industry']}
                </div>
                {/* marketcap
                pe ratio
                dividend yield
                average volumne */}

            </div>
        )
    }

    render() {
        
        if (this.props.props.companyDescription !== undefined){
            return(
                <div className='news'>
                    <div className='news-header'>About</div>
                    <div className='company'>
                        <div className='company-description'>
                            {this.props.props.companyDescription.description}
                        </div>

         
        
                            <div clasName='company-facts'>
                                {this.renderCompanyFacts()}
                            </div>
                   
                    </div>
                    
                    <div className='news-button-adjust'>
                        <a href={this.props.props.companyDescription.website} >
                            <button className={this.signReturn() === '+' ? 'news-button' : 'news-button-red'}>Learn More</button>
                        </a>
                    </div>
                    

                </div>
            )
        } else {
            return null;
        }
    }


}


export default About;