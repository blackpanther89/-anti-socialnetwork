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
            e.target.value="";


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
            <div className="chat">
                {messages.map(messages=>{
                    return(
                        <div className="messages" key={messages.id}>
                            <div className="sender">
                                {messages.firstname} {messages.lastname}  {messages.created_at}
                            </div>
                            <img className="newChatMessage_img" src={messages.image_url}/>
                            <div className= "send-message">
                                {messages.messages}
                            </div>

                        </div>
                    );
                })}
            </div>
        );
        console.log('listMessages', listMessages);
        return(
            <div>
                <h1 className="flashit"> W3LCM TO THE CHAT ROOM</h1>
                <div id="chat-messages" ref={elem => (this.elem = elem)}>
                    <textarea placeholder="Type a message ⌨️" className="textarea-chat" onKeyDown = {this.handleKeyDown}/>
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
