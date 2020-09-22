import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
                <label>Email
                    <br />
                        <input type="text"
                        value={this.state.email}
                        onChange={this.update('email')}
                        className="login-input"
                    />
                </label>
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
                        <br />
                        <div className='Email'>
                            {this.emailField(this.props.formType)}
                        </div>
                        <br />
                        <div className="username">
                            <label>{this.props.formType === "Sign up" ? "Username" : "Email or username"}
                            <br />
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                className="login-input"
                            />
                            </label>
                        </div>
                        <br />
                        <div className="password">
                            <label>Password
                            <br />
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                className="login-input"
                            />
                            </label>
                        </div>
                        <br />
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
