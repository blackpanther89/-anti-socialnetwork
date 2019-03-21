import React from 'react';
import axios from './axios';
import FriendButton from './friendbutton';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }



    componentDidMount(){
        // console.log('componentDidMount');
        axios.get('/users/' + this.props.match.params.id).then(({data})=>{
            // console.log('data OtherProfile', data);
            if( this.props.id == this.props.match.params.id){
                this.props.history.push('/');
            } else{
                // console.log('hjsdhsdhj');
                this.setState(data);

            }
        }
        );

    }
    render (){
        return(

            <div className= "others">
                <div className="others-title">
                    <h3 className="title-other-profile">Other People Profile </h3>
                </div>
                <br/>
                {this.state.firstname}
                <br/>
                <br/>
                <img  className="others-pic" src= {this.state.image_url}/>
                <br/>
                <br/>
                {this.state.bio}

                <div className="friendbutton">
                    <FriendButton
                        otherUserId ={
                            this.props.match.params.id
                        }
                    />
                </div>

            </div>
        );

    }
}
