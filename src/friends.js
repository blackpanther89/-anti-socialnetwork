import React from 'react';
import {connect} from 'react-redux';
import {receiveFriendsWannabes} from './actions';
import {Link} from 'react-router-dom';

export default class Friends extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){

        function list (props){
            const receiveFriendsWannabes =()=> thi.props.dispatch(receiveFriendsWannabes())
            return(
                props.bio

            )



        }
        // dispatch
        // call function friends ans wannabe in actions
    }
    render (){
        console.log('this.props');
        return(
            <div>
            Friends
            </div>
        );
    }
}
const mapStateTOProps = state=>{
    return{
        wannabes: state.wannabes && state.wannabes.filter(user => .friends === false)
        //filter methos might come handy  array accepted  colon false
        friends: //filter out eve
        //loop threw all the accepted friends array accepted colon  true
    };
};

export default connect (mapStateTOProps)(Friends);
