import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendship: null,
        };
        this.handleClick = this.handleClick.bind(this);

    }



    componentDidMount(){
        axios.get('/get-initial-status/'+this.props.otherUserId).then(data=>{
            // console.log("data.data.rows[0]",data.data.rows[0]);
            this.setState({
                friendship: data.data.rows[0]
            });


        });
    }



    handleClick(){
        console.log('handle click running');

        // Send Friend Request
        if (this.state.friendship === undefined){
            axios.post("/send-friend-request/" + this.props.otherUserId).then(data=>{
                this.setState({
                    friendship: data.data.data
                });
            });
        } else if (this.state.friendship.accepted === true){
            axios.post("/cancel-friend-request/" +this.props.otherUserId ).then(()=>{
                this.setState({
                    friendship: undefined
                });
            });
        } else if (this.state.friendship && this.state.friendship.receiver == this.props.otherUserId){
            axios.post("/cancel-friend-request/" +this.props.otherUserId ).then(()=>{
                this.setState({
                    friendship: undefined
                });
            });
        } else if (this.state.friendship && this.state.friendship.sender == this.props.otherUserId){
            axios.post("/accept-friend-request/" +this.props.otherUserId ).then(data=>{
                console.log("/accept-friend-request/", data);
                this.setState({
                    friendship: data.data.data
                });
            });
        } else {
            console.log("unexpected");
        }

    }

    render(){
        console.log("/friendbutton state.friendship/",this.state.friendship);
        if(this.state.friendship === null){
            return (<div>Loading...</div>);
        } else if (this.state.friendship === undefined){
            return (<button onClick ={this.handleClick}>
                Send Friend Request
            </button>);
        }else if(this.state.friendship.accepted === true){
            return (<button onClick ={this.handleClick}>
                Unfriend
            </button>);
        } else if (this.state.friendship.receiver == this.props.otherUserId){
            return (<button onClick ={this.handleClick}>
                Cancel Friend Request
            </button>);

        }else if(this.state.friendship.sender == this.props.otherUserId){
            return (<button onClick ={this.handleClick}>
                Accept Friend Request
            </button>);
        }
    }
}
