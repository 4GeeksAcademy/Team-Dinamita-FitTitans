import React, { useState } from 'react';
import './chatgpt.css';

export const ChatGpt = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      console.log(message)
      const res = await fetch(`${process.env.BACKEND_URL}/chatgpt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({mensaje: message}) // Aquí se convierte 'requestBody' a JSON
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div id='diva'>
      <h1>Pregúntale a ChatGPT</h1>
      <textarea
        id='textareas'
        rows="4"
        cols="50"
        placeholder="Escribe tu pregunta aquí..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={sendMessage}>Enviar</button>
      <div id='diva'>
        <h2>Respuesta:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};
