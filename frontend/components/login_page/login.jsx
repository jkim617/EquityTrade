import React from 'react';
import { Link } from 'react-router-dom';


import LogInFormContainer from '../session_form/login_form_container';

class LogIn extends React.Component {
    render() {
        return(
            <div className="login-page">
                <div className='login_pic'>
                  I NEED A PICTURE HERE
                </div>
                
                <div className="login-right-container">
                    <LogInFormContainer />
                </div>
            </div>
        )
    }
}

export default LogIn;