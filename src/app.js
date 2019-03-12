import React from 'react';
import axios from './axios';
import ProfilePic from './profilepic';
import Uploader from './uploader';
import Profile from './profile';
import { BrowserRouter, Route } from 'react-router-dom';
import OtherProfile from './otherprofile';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisibl: false,
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.showBioEditor=this.showBioEditor.bind(this);
        this.setBio= this.setBio.bind(this);
    }
    showUploader(e) {
        e.preventDefault();
        console.log('i am showUploader');
        this.setState({ uploaderIsVisible: true});
    }
    setImage(image) {
        this.setState({ image: image});
    }
    showBioEditor(){
        this.setState({ BioEditorIsVisible: true});

    }
    setBio(bio){
        console.log('setBio in app.js',bio);
        this.setState({bio:bio});
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
                bio: data.data.bio

            },()=>{
                console.log('this.state in app', this.state);
            });
        });

    }

    render() {

        if (!this.state.id) {
            return null;
        }

        return (
            <div>
                <div className="header">

                    <img src="/logo.jpg" alt="Social network logo" />

                </div>
                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/user/:id"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    firstName={this.state.firstName}
                                    lastName={this.state.lastName}
                                    image={this.state.image}
                                    showUploader={this.showUploader}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                            )}
                        />
                        {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}

                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />

                    </div>
                </BrowserRouter>
            </div>






        );
    }
}
