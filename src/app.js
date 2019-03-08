import React from 'react';
import axios from './axios';
import ProfilePic from './profilepic';
import Uploader from './uploader';
import Profile from './profile'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaderIsVisible: false,
    };
    this.showUploader = this.showUploader.bind(this);
    this.setImage = this.setImage.bind(this);
  }
  showUploader(e) {
      e.preventDefault()
      console.log('i am showUploader');
    this.setState({ uploaderIsVisible: true})
  }
  setImage(image) {
    this.setState({image});
  }
  setBio(bio){
      this.setState({bio})
  }
  componentDidMount() {

    console.log('componentDidMount');
    axios.get('/user').then(data=> {

      //id, fisrt, last,
      console.log('data', data);
      this.setState({
        firstName: data.data.firstname,
        lastName: data.data.lastname,
        image: data.data.image_url,
        id: data.data.id
      });
    });
  }

  render() {
    if (!this.state.id) {
      return null;
    }
    return (
      <div className="all">
      <div>
        <img src="./logo.jpeg" alt="Social network logo" />
        <ProfilePic
          image={this.state.image}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          showUploader={this.showUploader}
        />
        {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
</div>

<div>
<Profile
    id={this.state.id}
    firstName={this.state.firstName}
    lastName={this.state.lastName}
    image={this.state.image}
    showUploader={this.showUploader}
    bio={this.state.bio}
    setBio={this.setBio}
/>
</div>
      </div>


    );
  }
}
