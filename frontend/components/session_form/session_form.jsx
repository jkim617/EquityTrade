import React from 'react';
import {Link} from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            fname: '',
            lname: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formTypeClass = this.formTypeClass.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }

    formTypeClass() {
        if(this.props.formType === 'Sign up') {
            return true
        } else {return false}
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    emailField(formType) {
        if (formType === 'Sign up') {
            return (
                <div className='email-input'>
                        <input placeholder="Email" type="text"
                        value={this.state.email}
                        onChange={this.update('email')}
                        className={this.formTypeClass() && this.props.errors.length > 0 && this.state.email.length === 0 ? "signup-input-red" : "signup-input"}
                    />
                </div>)
        }
    }

    fnameField(formType) {
        if (formType === 'Sign up') {
            return (
                <div className='fname-input'>
                    <input placeholder="First name" type="text"
                        value={this.state.fname}
                        onChange={this.update('fname')}
                        className={this.formTypeClass() && this.props.errors.length > 0 && this.state.fname.length === 0 ? "signup-input-red" : "signup-input"}
                    />
                </div>)
        }
    }

    lnameField(formType) {
        if (formType === 'Sign up') {
            return (
                <div className='lname-input'>
                    <input placeholder= "Last name" type="text"
                        value={this.state.lname}
                        onChange={this.update('lname')}
                        className={this.formTypeClass() && this.props.errors.length > 0 && this.state.lname.length === 0 ? "signup-input-red" : "signup-input"}
                    />
                </div>)
        }
    }

    renderErrors() {
        if(!this.formTypeClass() && this.props.errors.length > 0) {
            return (
            <ul>
                    <li className='login-error-sub'><img className='error-logo' src={window.errorlogoURL} /><div className='login-error-text'>{this.props.errors[0]}</div></li>
            </ul>
        );} 
        else {
            if(this.formTypeClass() && this.props.errors.length > 0) {
                return (
                    <ul className='signup-error-list'>
                        {this.state.fname.length === 0 ? <li>{this.props.errors[0]}</li> : "" }
                        {this.state.lname.length === 0 ? <li>{this.props.errors[1]}</li> : ""}
                        {this.state.username.length === 0 ? <li>{this.props.errors[2]}</li> : ""}
                        {this.state.email.length === 0 ? <li>{this.props.errors[3]}</li> : ""}
                        {this.state.password.length < 10 ? <li>{this.props.errors[4]}</li> : ""}
                    </ul>
                )
            }
        }
    }

    componentDidMount() {
        return (
            this.props.removeErrors()
        )
    }

   
    handleDemo(e) {
        e.preventDefault();
        this.setState({ username: 'demo_user', password: 'password123' },
        () => {
            const user = Object.assign({}, this.state);
            return this.props.processForm(user);
        });
    }


    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
                        <div className={this.formTypeClass() ? "signup-form" : 'login-form'}>
                            <div className='name-field'>
              
                                {this.fnameField(this.props.formType)}
            
                                {this.lnameField(this.props.formType)}
           
                            </div>
                        
                     
                                {this.emailField(this.props.formType)}
                 
                            <div className='login-welcome'>{this.formTypeClass() ? "" : "Welcome to EquityTrade"}</div>
                            <div className={this.formTypeClass() ? "signup-username" : "login-username"}>
                                <label className='login-label'>{this.formTypeClass() ? "" : "Email or username"}</label>
                                <input type="text" placeholder={this.formTypeClass() ? "Username" : ""}
                                    value={this.state.username}
                                    onChange={this.update('username')}
                                    className={this.formTypeClass() ? 
                                        (this.props.errors.length > 0 && this.state.username.length === 0 ? "signup-input-red" : "signup-input") : "login-input"}
                                    required={this.formTypeClass() ? "" : "required"}
                                /> 
                            </div>

                            <div className={this.formTypeClass() ? "signup-password" : "login-password"}>
                                <label className='login-label'>{this.formTypeClass() ? "" : "Password"}</label>
                                    <input type="password" placeholder={this.formTypeClass() ? "Password (min. 10 characters)" : ""}
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className={this.formTypeClass('password') ?
                                        (this.props.errors.length > 0 && this.state.password.length === 0 ? "signup-input-red" : "signup-input") : "login-input"}
                                    required={this.formTypeClass() ? "" : "required"}
                                />
                            </div>
                            
                            <div className={this.formTypeClass() ? 'session-submit' : "session-submit-login"}>
                                <div className='login-demo'>
                                    <input className={this.formTypeClass() ? "signup-submit" : "login-submit"} type="submit" value={this.props.submitButton} />
                                    {this.formTypeClass() ? "" : <input className='login-submit' onClick={this.handleDemo} value='Demo'/>}
                                </div>
                                
                                {this.formTypeClass() ? "" : 
                                    <div className='login-error'>
                                        {this.renderErrors()}
                                    </div>}
                                
                                <div className='login-forgot'>
                                    {this.formTypeClass() ? "" : "Forgot your username or password?"}
                                </div>
                        
                               

                                <div className="signup-submit-links">
                                    <div className='signup-submit-started'>
                                        {this.formTypeClass() ? "Already started?" : ""}
                                    </div>
                                    
                                    {this.formTypeClass() ? <Link className="signup-links-application" to='/login'>Log in to complete your application</Link> : ""}
                                </div> 
                            </div>
                            
                            {this.formTypeClass() ? <div className='signup-error'>{this.renderErrors()}</div> : ""} 
                        
                        </div>
                </form>
                
            </div>
        );
    }
}

export default SessionForm;
