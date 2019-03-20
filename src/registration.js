import React from 'react';
import axios from './axios';
import {Link} from 'react-router-dom';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        axios
            .post('/registration', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
            })
            .then(({data}) => {
                if (data.success) {
                    location.replace('/');
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    render() {
        return (
            <div className= "register-box">
                <h2> REGISTER</h2>
                {this.state.error && <div className="error">Oops!</div>}
                <br />
                <br />
                <input
                    name="firstName"
                    placeholder="First Name"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <input
                    name="lastName"
                    placeholder="Last Name"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <input
                    name="email"
                    placeholder=" Email"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <button  className="register-button" type="submit" onClick={this.submit}> Register</button>
                <br />
                <br/>
                <br />
                <br/>
                <br />
                <br/>
                <Link className="login-link" to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}
