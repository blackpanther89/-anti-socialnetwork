import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);

    }


    handleClick(){
        console.log('handle click running');
    }

    componentDidMount(){
        axios.get('/get-initial-status/'+this.props.otherUserId).then(data=>{
            if(data.data.row == 0){
                this.setState({
                    buttonText:'Send Friend Request'
                });
            }else if( data.data.accepted == true) {
                this.setState({
                    buttonText:'End Frienship'
                });
            } else if (data.data.accepted == false){
                this.setState({
                    buttonText:'End Frienship'
                });

            }

        });
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
