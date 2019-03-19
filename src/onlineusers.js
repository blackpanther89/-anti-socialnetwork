import React from 'react';
import {connect} from 'react-redux';



export class OnlineUsers extends React.Component {
    constructor(props){
        super(props);
    }
    render (){
        const {onlineUsers} =this.props;
        console.log('this.props in onlineUsers', this.props);

        if(!onlineUsers){
            return null;
        }
        const list =(
            <div>
                {onlineUsers.map(onlineUsers=>{
                    return(
                        <div className="Online" key={onlineUsers.id}>
                            <img className="onlineUsers_img" src= {onlineUsers.image_url}/>
                            <p>{onlineUsers.firstname} {onlineUsers.lastname}</p>
                        </div>
                    );
                })}
            </div>
        );
        return(
            <div>
                <h1>Online Users</h1>
                {list}
            </div>
        );
    }
}

const mapStateToProps = state=> {
    console.log('state buuuuuu', state);
    return {
        onlineUsers: state.onlineUsers
    };
};
export default connect (mapStateToProps)(OnlineUsers);
