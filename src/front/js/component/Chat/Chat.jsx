/*import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "./chat.css";

const socket = io(process.env.BACKEND_URL, {
    transports: ['websocket'], // Forzar la conexión a WebSocket
    query: {
        user_id: localStorage.getItem('user_id')
    }
});

export const Chat = () => {
    const [remitenteId, setRemitenteId] = useState(null);
    const [destinatarioId, setDestinatarioId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Obtener el remitenteId del localStorage
        const remitenteIdFromStorage = localStorage.getItem('user_id');
        if (remitenteIdFromStorage) {
            const remitenteIdInteger = parseInt(remitenteIdFromStorage);
            setRemitenteId(remitenteIdInteger);

            // Función para obtener el destinatario
            const fetchDestinatarioId = async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/destinatario?remitente_id=${remitenteIdInteger}`);
                    console.log(response)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setDestinatarioId(parseInt(data.destinatario_id));

                    // Fetch messages una vez que se establezca destinatarioId
                    fetchMessages(parseInt(data.destinatario_id));
                } catch (error) {
                    console.log('Error fetching destinatario_id:', error);
                }
            };

            // Función para obtener los mensajes
            const fetchMessages = async (destinatarioIdInteger) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/mensajes?remitente_id=${remitenteIdInteger}&destinatario_id=${destinatarioIdInteger}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setMessages(data);
                } catch (error) {
                    console.log('Error fetching messages:', error);
                }
            };

            // Llamar a la función para obtener el destinatario si remitenteId está definido
            if (remitenteIdInteger) {
                fetchDestinatarioId();
            }
        }

        // Configuración de los listeners del socket.io
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('error', (error) => {
            console.error('Error from server:', error);
        });

       // Función de limpieza al desmontar el componente
       return () => {
        socket.off('message');
        socket.off('error');
        socket.disconnect();
    };

    }, []); // Dependencia vacía para ejecutar solo una vez al montar el componente

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
                            <li key={index} className="mensajeItem">
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
    );
};*/