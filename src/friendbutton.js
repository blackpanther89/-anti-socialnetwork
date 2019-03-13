import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);

    }



    componentDidMount(){
        let otherUserId= this.props.otherUserId;
        let myId= this.props.myId;
        axios.get('/get-initial-status/'+this.props.otherUserId).then(data=>{
            console.log("data.data in get status",data);
            if(data.data.row == 0){
                this.setState({
                    buttonText:'Send Friend Request'
                });
            }else if( data.data.accepted == true) {
                this.setState({
                    buttonText:'Unfriend'
                });
            } else if (!data.data.accepted && data.data.receiver == otherUserId){
                this.setState({
                    buttonText:'Cancel Friend Request'
                });

            }else if(!data.data.accepted&& data.data.receiver == myId){
                console.log('data.accepted',data.accepted);
                this.setState({
                    buttonText:'Accept Friend Request'
                });
            }

        });
    }

    handleClick(){
        console.log('handle click running');
        if (this.state.buttonText== 'Send Friend Request'){
            axios.post("/send-friend-request/" + this.props.otherUserId ).then(()=>{

                this.setState({
                    buttonText:'Cancel Friend Request'
                });


            });
        }

        else if (this.state.buttonText== 'Unfriend' || 'Cancel Friend Request' ){
            axios.post("/end-friendship/" +this.props.otherUserId ).then(()=>{

                this.setState({
                    buttonText:'Send Friend Request'
                });


            });
        }

        else if (this.state.buttonText== 'Accept Friend Request'){
            axios.post("/accept-friend-request/" +this.props.otherUserId ).then(()=>{

                this.setState({
                    buttonText:'Unfriend'
                });


            });
        }
    }

    render(){
        return(

            <div>
                <button onClick ={this.handleClick}>
                    {this.state.buttonText}
                </button>

            </div>
        );
    }
}
