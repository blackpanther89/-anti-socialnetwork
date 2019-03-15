import axios from 'axios';

export async function receiveFriendsWannabes(list){
    return axios.get ('/get-friends-and-wannabes/').then(data=>{
        return{
            type: 'RECEIVE_FRIENDS_WANNABES',
            list 
        };
    }

    );
}
