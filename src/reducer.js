export default function reducer(state = {}, action){
    if (action.type == 'RECEIVE_FRIENDS_WANNABES') {
        return Object.assign({}, state,{
            users : action.users

        });
    }

    if (action.type== "UNFRIEND"){
        state={
            ...state,
            users:state.users.filter(friends=>{
                if (action.friends != friends.id){
                    return friends;
                }
            })
        };
    }

    if (action.type == 'ACCEPT_FRIEND_REQUEST') {
        state = Object.assign({}, state, {
            users: state.users.map(friends => {
                if (action.friends == friends.id) {
                    return Object.assign({}, friends, {
                        accepted: true
                    });
                } else {
                    return Object.assign({}, friends);
                }
            })
        });
    }



    console.log("State in Reducer", state);
    return state;
}
