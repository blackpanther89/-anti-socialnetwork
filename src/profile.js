import React from 'react';
import ProfilePic from './profilepic';
import BioEditor from './bioeditor';



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
            <div className="profile">
            

                <ProfilePic
                    image={this.props.image}
                    showUploader={this.props.showUploader}

                />
                <br/>
                <h1>  Hello, {this.props.firstName} how are you doing today?</h1>

                <p> {this.props.bio}</p>


                <BioEditor
                    bio={this.props.bio}
                    setBio={this.props.setBio}

                />

            </div>
        );

    }

}
