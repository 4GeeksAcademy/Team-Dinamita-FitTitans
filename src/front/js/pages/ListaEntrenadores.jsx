import React, { useContext, useEffect, useState, } from "react";
import { Context } from "../store/appContext";
import { Link, } from "react-router-dom";
import "../../styles/ListaEntrenadores.css";

export const ListaEntrenadores = () => {
  const { store, actions } = useContext(Context);
  const [entrenadores, setEntrenadores] = useState([]);

  useEffect(() => {
    actions.obtenerListaEntrenadores()
      .then(data => {
        setEntrenadores(data);  // Actualiza el estado con los datos de los entrenadores
      })
      .catch(error => {
        console.error("Error al obtener la lista de entrenadores:", error);
      });
  }, []);

  return (
    <div className="container mt-5 containerEntrenadores">
      <ul className="list-group mb-5">
        {entrenadores.map((entrenador, index) => (
          <li key={index} className="list-group-item bg-dark text-light">
            <div className="row align-items-center">
              <div className="fotoContainer col-4">
                <Link to={"/"}>
                  <img src={entrenador.imagen} alt="User" className="img-fluid rounded-circle" />
                </Link>
              </div>
              <div className="col-8 overflow-hidden">
                <p className="Nombre">Nombre: {entrenador.nombre} {entrenador.apellido}</p>
                <p>Email: {entrenador.email}</p>
                <p>Edad: {entrenador.edad}</p>
                <p>Género: {entrenador.genero}</p>
                <p>Tipo de entrenamiento: {entrenador.tipo_entrenamiento}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};