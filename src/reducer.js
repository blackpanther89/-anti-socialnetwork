export default function reducer(state = {}, action){
    if (action.type == 'RECEIVE_FRIENDS_WANNABES') {
        return Object.assign({}, state,{
            users : action.users

        });
    }

    if (action.type ==  'UNFRIEND'){
        Object.assign({}, state,{
            users: state.user.map(data=>{
                if(action.id == data.id){
                    return Object.assign({}, data, {
                        accepted:  true
                    });
                }else {
                    return Object.assign({}, data);
                }
            })

        });
    }


    console.log("State in Reducer", state);
    return state;
}
