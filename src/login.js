import React from 'react';
import axios from './axios';

export default class Login extends React.Component {
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
            .post('/login', {
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
            <div className="login-box">
                {this.state.error && <div className="error">Oops!</div>}
                <br />
                <br />
                <input name="email" placeholder="EMAIL" onChange={e => this.handleChange(e)} />
                <br />
                <input
                    placeholder="PASSWORD"
                    name="password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <br />

                <button className="login-button" type="submit" onClick={this.submit}> Log in</button>
            </div>
        );
    }
}
