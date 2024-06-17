import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Context } from '/workspaces/Team-Dinamita-FitTitans/src/front/js/store/appContext.js';
import "/workspaces/Team-Dinamita-FitTitans/src/front/styles/Chat.css"


export const Mensajes = ({ receiverId }) => {
    const socket = io(`${process.env.BACKEND_URL}`);
    const { store, actions } = useContext(Context);
    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {
        if (receiverId) {
            actions.fetchUserMessages(receiverId);
        }
    }, [receiverId, actions]);

    const handleSendMessage = async () => {
        if (messageContent.trim() === '') return;

        const success = await actions.sendMessage(messageContent, receiverId);
        if (success) {
            setMessageContent('');
            actions.fetchUserMessages(receiverId); // Actualizar los mensajes después de enviar uno nuevo
        }
    };

    return (
        <div className="chat-container">
            <div className="messages-container">
                {store.messages && store.messages.received.map((message, index) => (
                    <div key={index} className="received-message">
                        <p>{message.content}</p>
                    </div>
                ))}
                {store.messages && store.messages.sent.map((message, index) => (
                    <div key={index} className="sent-message">
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

