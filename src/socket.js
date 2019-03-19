import * as io from 'socket.io-client';
import {onlineUsers, userJoined, userLeft} from './actions';
import{ getMessages, newChatMessage} from './actions';

let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on('onlineUsers', data => {
            store.dispatch(
                onlineUsers(data)
            );
        });

        socket.on('userJoined', data => {
            console.log('socket in userJoined', data);
            store.dispatch(
                userJoined(data)
            );
        });

        socket.on('userLeft', data => {
            store.dispatch(
                userLeft(data)
            );
        });
        socket.on('getMessages', data=>{
            store.dispatch(getMessages(data));
        });
    }
    socket.on('newChatMessage', data=>{
        store.dispatch(newChatMessage(data));
    });

    return socket;
}
