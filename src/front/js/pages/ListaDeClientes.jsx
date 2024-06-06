import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaDeClientes = ({ entrenadorId }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Obtengo la lista de clientes del entrenador desde el servidor
    axios.get(`/entrenador/${entrenadorId}/clientes`)
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de clientes:', error);
      });
  }, [entrenadorId]);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeClientes;
