import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import "../../styles/ListaDeClientes.css";
import { motion } from 'framer-motion';

export const ListaDeClientes = ({ entrenadorId }) => {
  const { store, actions } = useContext(Context);
  const [clientes, setClientes] = useState([]);

  const idEntrenador = localStorage.getItem("user_id")
  useEffect(() => {
    actions.obtenerListaClientes(idEntrenador)
      .then(data => {
        setClientes(data);

      })
      .catch(error => {
        console.error("Error al obtener la lista de clientes", error);
      });
  }, [entrenadorId]);

  return (
    <>
    <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

    <div className="container contenedorClientes">
      <div className="contenedorTituloClientes">
        <div className="form-group TituloClientes">LISTA DE CLIENTES</div>
      </div>
      <div className="contenedorListaClientes">
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.id} className="clienteItem">
              <Link to={`/clientes/${cliente.id}`} className="clienteLink">
                {cliente.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    </motion.div>
    </>
  );
}


