import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';

let elem;

if (location.pathname == '/welcome') {
  elem = <Welcome />;
} else {
  elem = <img src="./logo.jpg" />;
}

ReactDOM.render(elem, document.querySelector('main'));

//
// ReactDOM.render(<Welcome />, document.querySelector('main'));
//
// function Welcome() {
//   return <div>Welcome</div>;
// }
// we can return an empy string, object and an null
//we do not use th wor class but className= "whatever"
