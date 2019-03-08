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
      <div>
        {this.state.error && <div className="error">Oops!</div>}
            <br />
        <input name="email" onChange={e => this.handleChange(e)} />
            <br />
        <input
          name="password"
          type="password"
          onChange={e => this.handleChange(e)}
        />
            <br />
                <br />
        <button type="submit" onClick={this.submit}> Log in</button>
      </div>
    );
  }
}
