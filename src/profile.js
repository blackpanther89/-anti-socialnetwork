import React from 'react';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';
import Logout from './logout';




export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateBio: false
        };

    }
    render() {
        console.log('this.props in profile', this.props);
        return(
            <div className="profile-box">

                <div className="profilepic-box">
                    <Logout/>
                    <ProfilePic
                        image={this.props.image}
                        showUploader={this.props.showUploader}

                    />
                    <br/>
                    <div className="welcome-profile-text-box">
                        <h1 className="welcome-profile-text">  Hello, {this.props.firstName} how are you today?</h1>
                    </div>
                    <br/>

                    <br/>

                    <div className="bio">
                        <p> {this.props.bio}</p>
                    </div>


                    <BioEditor
                        bio={this.props.bio}
                        setBio={this.props.setBio}

                    />

                </div>
            </div>
        );

    }

}
