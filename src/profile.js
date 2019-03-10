import React from 'react';
import axios from './axios';
import ProfilePic from './profilepic'
import BioEditor from './bioeditor'



export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    }
    render() {
        return(
            <div className="profile">
            <h1> hello {this.props.firstName} {this.props.lastName}
            </h1>

            <ProfilePic
            image={this.props.image}
            // firstName={this.props.firstName}
            // lastName={this.props.lastName}

        showUploader={this.props.showUploader}

          />
          <BioEditor
          bio={this.props.bio}
          setBio={this.props.setBio}
          // showBioEditor={this.props.showBioEditor}
          />
          </div>




        )
    }


  }
