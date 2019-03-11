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
        return(
            <div className="profile">
                <h1 className="pic2"> <img src={this.props.image}/>
                </h1>
                <ProfilePic
                    image={this.props.image}
                    showUploader={this.props.showUploader}

                />
                <h1> Name: {this.props.firstName}</h1>
                <h2> Last Name: {this.props.lastName}</h2>
                <p> Bio:{this.props.bio}</p>
                {this.state.updateBio && <BioEditor bio={this.props.bio}/>}

                <BioEditor
                    bio={this.props.bio}
                    setBio={this.props.setBio}
                //     // showBioEditor={this.props.showBioEditor}
                />

            </div>
        );

    }

}
