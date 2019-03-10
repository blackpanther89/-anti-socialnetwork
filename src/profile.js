import React from 'react';
import axios from './axios';
import ProfilePic from './profilepic'
import BioEditor from './bioeditor'
import App from './app'


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    }
    render() {
        return(
            <div className="profile">
            <ProfilePic
            image={this.props.image}
            firstName={this.props.firstName}
            lastName={this.props.lastName}

        showUploader={this.props.howUploader}

          />
          <BioEditor
          bio={this.props.bio}
          setBio={this.props.setBio}
          showBioEditor={this.props.showBioEditor}
          />
          </div>




        )
    }


  }
