import React from 'react';
import axios from './axios';


export default class BioEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    }
    render() {
        return(
            <div className="bio">
          <BioEditor
          bio={this.props.bio}
          setBio={this.props.setBio}
          />
          </div>




        )
    }


  }
