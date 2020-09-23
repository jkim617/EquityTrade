import React from 'react';

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
            return (<div>
                        <input placeholder="Email" type="text"
                        value={this.state.email}
                        onChange={this.update('email')}
                        className="signup-input"
                    />
            </div>)
        }
    }

    fnameField(formType) {
        if (formType === 'Sign up') {
            return (<div>
                    <input placeholder="First name" type="text"
                        value={this.state.fname}
                        onChange={this.update('fname')}
                        className="signup-input"
                    />
            </div>)
        }
    }

    lnameField(formType) {
        if (formType === 'Sign up') {
            return (
                <div>
                    <input placeholder= "Last name" type="text"
                        value={this.state.lname}
                        onChange={this.update('lname')}
                        className="signup-input"
                    />
                </div>)
        }
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
            <br />
                {this.renderErrors()}
                    <div className="description">
                        {this.props.description}
                    </div>
                    <div className="login-form">
                        <div className='name_field'>
                            <div className='fname'>
                                {this.fnameField(this.props.formType)}
                            </div>
                            
                            <div className='lname'>
                                {this.lnameField(this.props.formType)}
                            </div>
                        </div>
                    
                        
                        <div className='Email'>
                            {this.emailField(this.props.formType)}
                        </div>
                  
                        <div className={this.formTypeClass() ? "signup-username" : "login-username"}>
                            <label>{this.formTypeClass() ? "" : "Username or email"}</label>
                            <input type="text" placeholder={this.formTypeClass() ? "Username" : ""}
                                value={this.state.username}
                                onChange={this.update('username')}
                                className={this.formTypeClass() ? "signup-input" : "login-input"}
                            /> 
                        </div>

                        <div className={this.formTypeClass() ? "signup-password" : "login-password"}>
                            <label>{this.formTypeClass() ? "" : "Password"}</label>
                                <input type="password" placeholder={this.formTypeClass() ? "Password" : ""}
                                value={this.state.password}
                                onChange={this.update('password')}
                                className={this.formTypeClass() ? "signup-input" : "login-input"}
                            />
                        </div>

                        <input className="session-submit" type="submit" value={this.props.submitButton} />
                    </div>
                </form>

                <br />
                {this.props.navLink}
            </div>
        );
    }
}

export default SessionForm;
