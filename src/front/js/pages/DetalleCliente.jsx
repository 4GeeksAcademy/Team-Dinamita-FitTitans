import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useParams, Link } from 'react-router-dom';
import "../../styles/DetalleCliente.css";

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
//{`/clientes/${cliente.id}/chat`}
  return (
    <div className="container contenedorDetalleCliente">
      <div className="contenedorTituloDetalleCliente">
        <div className="form-group TituloDetalleCliente">DETALLE DEL CLIENTE</div>
      </div>
      <div className="contenedorContenidoDetalleCliente">
        <p><strong>Nombre:</strong> {cliente.nombre}</p>
        <p><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Edad:</strong> {cliente.edad}</p>
        <p><strong>Género:</strong> {cliente.genero}</p>
        <p><strong>Altura:</strong> {cliente.altura}</p>
        <p><strong>Plan de entrenamiento:</strong> {cliente.plan_entrenamiento}</p>
        <div className="detalleLinks">
          <Link to={`/clientes/${cliente.id}/dieta`} className="detalleLink"><p><strong>DIETA</strong></p></Link>
          <Link to={`/clientes/${cliente.id}/rutina`} className="detalleLink"><p><strong>RUTINA</strong></p></Link>
          <Link to={`/clientes/${cliente.id}/chat`} className="detalleLink"><p><strong>CHAT</strong></p></Link>
        </div>
      </div>
    </div>
  );
}