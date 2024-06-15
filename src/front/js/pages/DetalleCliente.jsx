import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useParams, Link } from 'react-router-dom';

export const DetalleCliente = () => {
  const { cliente_id } = useParams();
  const { actions } = useContext(Context);
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    actions.obtenerDetalleCliente(cliente_id)
      .then(data => {
        setCliente(data);
      })
      .catch(error => {
        console.error("Error al obtener los detalles del cliente", error);
      });
  }, [cliente_id]);

  if (!cliente) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalle del Cliente</h2>
      <p><strong>Nombre:</strong> {cliente.nombre}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Edad:</strong> {cliente.edad}</p>
      <p><strong>Género:</strong> {cliente.genero}</p>
      <p><strong>Altura:</strong> {cliente.altura}</p>
      <p><strong>Plan de entrenamiento:</strong> {cliente.plan_entrenamiento}</p>
      <div>
        <Link to={`/asignacion/:asignacion_id/dieta`}><p><strong>Dieta</strong></p></Link>
        <Link to={`/clientes/${cliente_id}/rutina`}> <p><strong>Rutina</strong></p></Link>
      </div>
    </div>
  );
};