import React from 'react';
import axios from './axios';


export default class BioEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    }
    handleChange(e) {
      this[e.target.name] = e.target.value;
    }
    render() {
        return(
            <div className="bio">
    <textarea rows="4" cols="50" onChange={e => this.handleChange(e)}
    />
          </div>




        )
    }


  }
