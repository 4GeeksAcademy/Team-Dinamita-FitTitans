import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "/workspaces/Team-Dinamita-FitTitans/src/front/js/component/Chat/chat.css";
import { useParams } from 'react-router-dom';

const socket = io(process.env.BACKEND_URL, {
    transports: ['websocket'], // Forzar la conexión a WebSocket
    query: {
        user_id: localStorage.getItem('user_id')
    }
});

export const ChatEntrenador = () => {
    const [remitenteId, setRemitenteId] = useState(null);
    const [destinatarioId, setDestinatarioId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { cliente_id } = useParams();

    useEffect(() => {
        const remitenteIdFromStorage = localStorage.getItem('user_id');
        if (remitenteIdFromStorage) {
            setRemitenteId(parseInt(remitenteIdFromStorage));
        }
        setDestinatarioId(parseInt(cliente_id));
    }, [cliente_id]);

    useEffect(() => {
        if (remitenteId !== null && destinatarioId !== null) {
            const fetchMessages = async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/mensajes?remitente_id=${remitenteId}&destinatario_id=${destinatarioId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setMessages(data);
                } catch (error) {
                    console.log('Error fetching messages:', error);
                }
            };

            fetchMessages();

            socket.on('message', (msg) => {
                setMessages((prevMessages) => [...prevMessages, msg]);
            });

            socket.on('error', (error) => {
                console.error('Error from server:', error);
            });

            return () => {
                socket.off('message');
                socket.off('error');
            };
        }
    }, [remitenteId, destinatarioId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && destinatarioId) {
            socket.emit('message', {
                remitente_id: remitenteId,
                destinatario_id: destinatarioId,
                text: message
            });
            setMessage('');
        }
    };

    return (
        <div className='text-dark ' id='caja-chat' style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2 id='titulo'>Chat</h2>
            <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {messages.map((msg, index) => (
                        <li key={index} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                            <strong>{msg.remitente_nombre}</strong>: {msg.text} <br /> {msg.timestamp}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ flex: '1', marginRight: '10px', padding: '8px' }}
                    autoComplete="off"
                />
                <button onClick={sendMessage} id='boton'>Send</button>
            </div>
        </div>
    );
};
