import React from 'react';
import { Link } from 'react-router-dom';


import LogInFormContainer from '../session_form/login_form_container';

class LogIn extends React.Component {
    render() {
        return(
            <div className="login-page">
                <div className='login_pic'>
                    <img className='login-pic-1' src="https://cdn.robinhood.com/assets/generated_assets/cdfcb3cb965d71cf114d0aeb8f0a50cd.jpg" alt="a"/>
                </div>
                
                <div className="login-right-container">
                    <LogInFormContainer />
                </div>
            </div>
        )
    }
}

export default LogIn;