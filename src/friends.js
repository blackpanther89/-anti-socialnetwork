import React from 'react';
import {connect} from 'react-redux';
import {receiveFriendsWannabes} from './actions';
import{unfriend, acceptFriend}from './actions';

import Logout from './logout';


export class Friends extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){

        // dispatch
        // call function friends and wannabe in actions
        this.props.dispatch(receiveFriendsWannabes());


    }


    render (){
        const {wannabes} = this.props;
        const {friends} =this.props;
        console.log('this.props', this.props);
        console.log('wannabes');
        if(!wannabes || !friends){
            return null;
        }
        return(

            <div className="allfriends">
                <div className="my_friends">

                    <h3> MY FRIENDS</h3>
                    {friends.map(friends=>{
                        return(
                            <div className= "myfriends" key={friends.id} >
                                <img  className="friends" src= {friends.image_url}/>
                                <p>{friends.firstname} {friends.lastname}</p>
                                <br/>

                                <button  onClick={()=>this.props.dispatch(unfriend(friends.id))}>
                    END FRIENDSHIP </button>

                            </div>

                        );
                    })}


                </div>
                <h3 className="wannabetitle">WANNABE FRIENDS</h3>

                <div className="friends_and_wannabes">
                    {wannabes.map(wannabes=>{
                        return(
                            <div className= "wannabes" key={wannabes.id} >
                                <img className="friends" src= {wannabes.image_url}/>
                                <p>{wannabes.firstname} {wannabes.lastname}</p>
                                <button className="friendsB"
                                    onClick ={()=>this.props.dispatch(acceptFriend(wannabes.id))}>
                    Accept Friend Request</button>

                            </div>

                        );
                    })}
                </div>

            </div>
        );


    }
}




const mapStateToProps = state=> {
    console.log('state eeeee', state);
    return {
        // filter methos might come handy  array accepted  colon false
        wannabes: state.users && state.users.filter(wannabes=> wannabes.accepted === false),
        friends: state.users && state.users.filter(friends=>friends.accepted === true)
        // filter out eve
        // loop threw all the accepted friends array accepted colon  true
    };
};



export default connect (mapStateToProps)(Friends);
