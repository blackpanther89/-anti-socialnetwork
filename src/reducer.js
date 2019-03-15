export default function reducer(state = {}, action){
    if (action.type == 'RECEIVE_FRIENDS_WANNABES') {
        state = Object.assign({}, state, {
            users: action.users
        });
    }

    return state;
}
