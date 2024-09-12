import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "./chat.css";
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

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

        if (remitenteId !== null && destinatarioId !== null) {
            fetchMessages();

            socket.on('message', (msg) => {
                setMessages((prevMessages) => [...prevMessages, msg]);
            });

            socket.on('error', (error) => {
                console.error('Error from server:', error);
            });

           /* return () => {
                socket.off('message');
                socket.off('error');
                socket.disconnect();
            };*/
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
        <>
        <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}>

            <div className="containerPrincipalChat">
                <div className="contenedorTituloChat">
                    <div className="tituloChat">
                        CHAT
                    </div>
                </div>
                <div className="formularioChat">
                    <div className="cajaChat">
                        <ul>
                            {messages.map((msg, index) => (
                                <li
                                    key={index}
                                    className={`mensajeItem ${msg.remitente_id === remitenteId ? 'mensajeRemitente' : 'mensajeDestinatario'}`}
                                >
                                    <strong>{msg.remitente_nombre}</strong>: {msg.text} <br /> {msg.timestamp}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="inputContainer">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribe un mensaje"
                            autoComplete="off"
                        />
                        <button onClick={sendMessage}>Enviar</button>
                    </div>
                </div>
            </div>
        </motion.div>
        </>
    );
};
