import React from 'react';
import axios from './axios';
import ProfilePic from './profilepic';
import Uploader from './uploader';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaderIsVisible: false,
    };
    this.showUploader = this.showUploader.bind(this);
    this.setImage = this.setImage.bind(this);
  }
  showUploader() {
    this.state = {
      uploaderIsVisible: true,
    };
  }
  setImage(image) {
    this.setState({image});
  }
  componentDidMount() {
    //get data to show like in view
    axios.get('/user', ({data}) => {
      //id, fisrt, last,
      this.setState({
        firstName: '',
        lastName: '',
        profilePicUrl: '',
        userId: '',
      });
    });
  }
  render() {
    if (!this.state.id) {
      return null;
    }
  }
  render() {
    if (!this.state.id) {
      return null;
    }
    return (
      <div>
        <img src="./logo.jpg" alt="Social networ logo" />
        <ProfilePic
          image={this.state.image}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          showUploader={this.showUploader}
        />
        {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}

      </div>
    );
  }
}
