import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';

export const ListaDeClientes = ({ entrenadorId }) => {
  const { store, actions } = useContext(Context);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    actions.obtenerListaClientes(1)
      .then(data => {
        setClientes(data);  // Actualiza el estado con los datos de los entrenadores
        console.log(data)
      })
      .catch(error => {
        console.error("Error al obtener la lista de clientes", error);
      });
  }, [entrenadorId]);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            <Link to={`/clientes/${cliente.id}`}>
              {cliente.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


