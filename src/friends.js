import React from 'react';
import {connect} from 'react-redux';
import {receiveFriendsWannabes} from './actions';
import{unfriend, acceptFriend}from './actions';


export class Friends extends React.Component {
    constructor(props){
        super(props);
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
        if(!wannabes || !friends){
            return null;
        }
        return(

            <div className="friends_and_wannabes">
                <h1>WANNABES FRIENDS</h1>
                {wannabes.map(wannabes=>{
                    return(
                        <div className= "wannabes" key={wannabes.id} >
                            <img src= {wannabes.image_url}/>
                            {wannabes.firstname} {wannabes.lastname}
                            <button
                                onClick ={()=>this.props.dispatch(acceptFriend(wannabes.id))}>
                    ACCEPT FRIEND REQUEST</button>

                        </div>

                    );
                })}

                <div>
                    <h1> MY FRIENDS</h1>
                    {friends.map(friends=>{
                        return(
                            <div className= "friends" key={friends.id} >
                                <img src= {friends.image_url}/>
                                {friends.firstname} {friends.lastname}

                                <button onClick={()=>this.props.dispatch(unfriend(friends.id))}>
                            END FRIENDSHIP </button>

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
