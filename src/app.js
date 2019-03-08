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
  // setImage(image) {
  //   this.setState({image});
  // }
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
        id: data.data.id,
      });
    });
  }

  render() {
    if (!this.state.id) {
      return null;
    }
    return (
      <div>
        <img src="./logo.jpg" alt="Social network logo" />
        <ProfilePic
          image={this.state.image}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          onClick={this.showUploader}
        />
        {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}

      </div>
    );
  }
}
