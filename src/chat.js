import React from 'react';
import {connect} from 'react-redux';
import {getSocket} from "./socket";

export class Chat extends React.Component{
    constructor(props){
        super(props);
    }
    handleKeyDown(e) {
        if (e.which === 13){
            console.log('enter was pressed!!!!!!',  e.target.value);
            getSocket().emit('newChatMessage', e.target.value);

        }
    }
    componnentDidUpdate(){
        console.log('this.chatContainer', this.chatContainer);
        this.chatContainer.scrollTop='100px';
    }
    render(){
        const {messages} = this.props;
        console.log('this.props in messages', this.props);
        if(!messages){
            return null;
        }
        const listMessages = (
            <div>
                {messages.map(messages=>{
                    return(
                        <div className="messages" key={messages.id}>
                            <img className="newChatMessage_img" src={messages.image_url}/>
                            {messages.firstname} {messages.lastname}
                            {messages.messages} {messages.created_at}
                        </div>
                    );
                })}
            </div>
        );
        console.log('listMessages', listMessages);
        return(
            <div>
                <h1> CHAT ROOM</h1>
                <div id="chat-messages" ref={elem => (this.elem = elem)}>
                    <textarea onKeyDown = {this.handleKeyDown}/>
                </div>

                {listMessages}
            </div>
        );
    }

}

const mapStateToProps = state=> {
    console.log('state buuuuuu', state);
    return {
        messages:state.messages
    };
};
export default connect (mapStateToProps)(Chat);
