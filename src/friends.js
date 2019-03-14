import React from 'react';
import {connect} from 'react-redux';
export default class Friends extends React.Component {
    constructor(){
        super();
    }
    componentDidMount(){
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
const mapStateTOProps =state=>{
    return{
wannabes:, //filter methos might come handy  array accepted  colon false
friends: //filter out eve
//loop threw all the accepted friends array accepted colon  true
    };
};

export default connect (mapStateTOProps)(Friends);
