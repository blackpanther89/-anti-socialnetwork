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
                if (action.id != friends.id){
                    return friends;
                }
            })
        };
    }

    if (action.type == 'ACCEPT_FRIEND_REQUEST') {
        state = Object.assign({}, state, {
            users: state.users.map(friends => {
                if (action.id == friends.id) {
                    return Object.assign({}, friends, {
                        accepted: true
                    });
                } else {
                    return Object.assign({}, friends);
                }
            })
        });
    }


    //=============================SOCKET.IO==================================//

    if (action.type== 'ONLINE_USERS'){
        return Object.assign({}, state,{
            onlineUsers: action.onlineUsers
        });

    }
    if (action.type== 'USER_JOINED'){
        state={
            ...state,
            onlineUsers:[...state.onlineUsers, action.userJoined]
        };
        return state;
    }

    if (action.type== "USER_LEFT"){
        state={
            ...state,
            onlineUsers:state.onlineUsers.filter(onlineUsers=>{
                if (action.id != onlineUsers.id){
                    return state;
                }
            })
        };
    }
    //======================CHAT==============================================//
    if (action.type== 'GET_MESSAGES'){
        return Object.assign({}, state,{
            messages: action.messages
        });

    }
    if (action.type== 'NEW_CHAT_MESSAGE'){
        console.log(' action in newChatMessage', action);
        state={
            ...state,
            messages:[...state.messages, action.messages]
        };
        return state;
    }


    console.log("State in Reducer", state);
    return state;
}
