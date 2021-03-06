import React from 'react';
import axios from './axios';
import Uploader from './uploader';
import Profile from './profile';
import { BrowserRouter, Route } from 'react-router-dom';
import OtherProfile from './otherprofile';
import Friends from './friends';
import OnlineUsers from './onlineusers';
import Chat from './chat';




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
                    <a href="/">
                        <img  className="logo" src="/logo.jpg" alt="Social network logo" />
                    </a>
                    <a className=" friends-link" href="/friends">Friends 👥 </a>
                    <a className=" online-link" href="/online">Online 👁</a>
                    <a className=" chat-link" href="/chat">Chat 💬 </a>


                    <h1> <img className="little-profile-pic" src={this.state.image}/>



                    </h1>

                </div>

                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
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
                                    id={this.state.id}
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/friends"
                            render={()=> (
                                <Friends/>
                            )}
                        />
                        <Route
                            path="/online"
                            render={()=> (
                                <OnlineUsers/>
                            )}
                        />
                        <Route
                            path="/chat"
                            render={()=> (
                                <Chat/>
                            )}
                        />
                    </div>

                </BrowserRouter>
            </div>






        );
    }
}
