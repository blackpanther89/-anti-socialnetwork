import React from 'react';
import {connect} from 'react-redux';



export class OnlineUsers extends React.Component {
    constructor(props){
        super(props);
    }
    render (){
        const {onlineUsers} =this.props;
        console.log('this.props', this.props);

        if(!onlineUsers){
            return null;
        }
        const list =(
            <div>
                {onlineUsers.map(onlineUsers=>{
                    return(
                        <div key={onlineUsers.id}>
                            <img  src= {onlineUsers.image_url}/>
                            {onlineUsers.firstname} {onlineUsers.lastname}
                        </div>
                    );
                })}
            </div>
        );
        return(
            <div>
                <h1>Online Users</h1>
            </div>
        );
    }
}

const mapStateToProps = state=> {
    console.log('state eeeee', state);
    return {
        state

    };
};
export default connect (mapStateToProps)(OnlineUsers);
