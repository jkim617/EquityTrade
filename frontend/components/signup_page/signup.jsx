import React from 'react';
import {Link} from 'react-router-dom';

import SessionFormContainer from '../session_form/signup_form_container';

class SignUp extends React.Component {
    render() {
        return(
            <div className='signup-page'>
                <div className='signup-leftpage'>
                    <div className='signup-leftpage-content'>
                        <div className='signup-leftpage-content-1'>
                            <div className='signup-leftpage-content-1-1'>
                                <div className='logo-1'>
                                    <Link to="/">EquityTrade</Link>
                                </div>

                                <div className="signup-description">
                                    <div id="signup-description-title">Make Your Money Move</div>
                                    
                                    <div id="signup-description-sentence">
                                        EquityTrade lets you invest in companies you love, commission-free.
                                    </div>
                                </div>
                            </div>
                    
                            
                            <div className='signup-form'>
                                <SessionFormContainer />
                            </div>
                        </div>

                        <div className="signup-leftpage-content-2">
                            <div className="signup-leftpage-content-2-1">
                                All investments involve risk and the past performance of
                                a security, or financial product does not guarantee future 
                                results or returns. Keep in mind that while diversification 
                                may help spread risk it does not assure a profit, or protect 
                                against loss, in a down market. There is always the potential of 
                                losing money when you invest in securities, or other financial products. 
                                Investors should consider their investment objectives and risks carefully 
                                before investing.
                            </div>
                            
                            <div className="signup-leftpage-content-2-2">
                                EquityTrade Financial, LLC is a wholly owned subsidiary of 
                                EquityTrade Markets, Inc.
                            </div>
                            
                            <div className="signup-leftpage-content-2-3">
                                Please remember that this is just a web app for trade simulation and NOT to be used for real investments.
                            </div>

                            <div className="signup-leftpage-content-2-4"> 
                                <div className="signup-links">EquityTrade Terms & Conditions  Disclosure Library  Contact Us  FAQ</div>
                            </div>

                            <div className="signup-leftpage-content-2-5">
                                © 2020 EquityTrade. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>

                <div className='signup-rightpage'>
                    <div className="signup-rightpage-1">
                        <div className="signup-rightpage-1-header">
                            Commission-free stock trading
                        </div>

                        <div className="signup-rightpage-1-text">
                            This is a fun web app to simulate trades with real time stock data. Please be aware that 
                            we are not responsible for any investment decisions influenced from the use of this app.
                        </div>

                        <div className="signup-rightpage-1-header">
                            Account Protection
                        </div>

                        <div className="signup-rightpage-1-text">
                            Securities in your account are simulated.
                        </div>

                        <div className="signup-rightpage-1-header">
                            Keep tabs on your fake money
                        </div>

                        <div className="signup-rightpage-1-text">
                            Set up customized news and notifications to stay on top 
                            of your assets as casually or as relentlessly as you like. 
                            Controlling the flow of info is up to you.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;