import axios from './axios';

export function receiveFriendsWannabes(){
    return axios.get ('/get-friends-and-wannabes').then(data=>{
        console.log('data in getFriendsAndWannabes bbbb', data.data.data.rows);
        return{
            type: 'RECEIVE_FRIENDS_WANNABES',
            users : data.data.data.rows
        };
    }

    );
}
//======================================================================//

export function unfriend(id){
    console.log(' id in cancelFriendRequest bbbb', id );
    return axios.post ('/cancel-friend-request/'+ id).then(()=>{
        return{
            type: 'UNFRIEND',
            id
        };
    }

    );
}
//============================================================================//

export function acceptFriend(id){
    return axios.post ('/accept-friend-request/' + id ).then(data=>{
        console.log('data in acceptFriendRequest AAA', data);
        return{
            type: 'ACCEPT_FRIEND_REQUEST',
            id
        };
    }

    );
}
