import React from 'react';
import ReactDOM from 'react-dom';
import Registration from './registration';
import Login from './login';
import {HashRouter, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="welcome">
        <img src="./logo.jpg" />
        <h1>Welcome Ⓐmigo!</h1>
        <p>Welcome to the jungle ⚑</p>
        <HashRouter>
          <div>
            <Route exact path="/" component={Registration} />
            <Route path="/login" component={Login} />
          </div>
        </HashRouter>

      </div>
    );
  }
}
