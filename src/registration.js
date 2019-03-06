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
    // this.setState({
    //     [e.target.name]: e.target.value
    // });
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
      <div>
        {this.state.error && <div className="error">Oops!</div>}
        <input name="firstName" onChange={e => this.handleChange(e)} />
        <input name="lastName" onChange={e => this.handleChange(e)} />
        <input name="email" onChange={e => this.handleChange(e)} />
        <input
          name="password"
          type="password"
          onChange={e => this.handleChange(e)}
        />
        <button type="submit" onClick={this.submit}> Register</button>
      </div>
    );
  }
}
