import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "/workspaces/Team-Dinamita-FitTitans/src/front/js/component/Chat/chat.css"
const socket = io(`${process.env.BACKEND_URL}`);

export const Chat = () => {
    const [remitenteId, setRemitenteId] = useState(null);
    const [destinatarioId, setDestinatarioId] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Obtener el remitenteId del localStorage
        const remitenteIdFromStorage = localStorage.getItem('user_id'); // Ajusta la clave según como lo almacenes
    
        if (remitenteIdFromStorage) {
            const remitenteIdInteger = parseInt(remitenteIdFromStorage);
            setRemitenteId(remitenteIdInteger); // Asegúrate de convertir a entero si es necesario
    
            // Función para obtener el destinatario
            const fetchDestinatarioId = async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/destinatario?remitente_id=${remitenteIdInteger}`);
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
                    console.log(data)
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
            console.log(messages)
        });
    
        socket.on('error', (error) => {
            console.error('Error from server:', error);
        });
    
        // Función de limpieza al desmontar el componente
        return () => {
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
        <div className='text-dark ' id='caja-chat' style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2 id='titulo'>Chat</h2>
            <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {messages.map((msg, index) => (
                        <li key={index}  style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                            <strong>{msg.remitente_nombre}</strong>: {msg.text} <br/> {msg.timestamp}
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
                <button onClick={sendMessage}  id='boton'>Send</button>
            </div>
        </div>
    );
};
