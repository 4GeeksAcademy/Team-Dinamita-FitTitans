import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/ListaEntrenadores.css";

export const ListaEntrenadores = () => {
  const { store, actions } = useContext(Context);
  const [seleccionarPlan, setSeleccionarPlan] = useState(null);
  const [currentEntrenadorId, setCurrentEntrenadorId] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showFelicidades, setShowFelicidades] = useState(false);

  const usuario_id = localStorage.getItem("user_id");
  const user_role = localStorage.getItem("user_role");

  useEffect(() => {
    if (!loaded) {
      actions.obtenerListaEntrenadores()
        .then(data => {
          setLoaded(true);
        })
        .catch(error => {
          console.error("Error al obtener la lista de entrenadores:", error);
        });
    }
  }, [actions, loaded]);

  const contratarEntrenador = () => {
    if (!usuario_id) {
      setError(new Error("Debes estar registrado para contratar a un entrenador"));
      return;
    }
    if (!currentEntrenadorId || !seleccionarPlan) {
      setError(new Error("Debes seleccionar un entrenador y un plan"));
      return;
    }
    actions.contratarEntrenador(currentEntrenadorId, usuario_id, seleccionarPlan)
      .then(response => {
        if (response.error) {
          throw new Error(response.error);
        }
        setShowFelicidades(true);
        const felicidadesModalElement = document.getElementById("felicidadesModal");
        const felicidadesModal = new window.bootstrap.Modal(felicidadesModalElement);
        felicidadesModal.show();
      })
      .catch(error => {
        console.error("Error al contratar al entrenador:", error);
        setError(error);
      });
  };

  const selectPlan = (plan) => {
    setSeleccionarPlan(plan);
    const planModalElement = document.getElementById("planModal");
    const planModal = new window.bootstrap.Modal(planModalElement);
    planModal.hide();
  };

  const openPlanModal = (entrenadorId) => {
    setCurrentEntrenadorId(entrenadorId);
    const planModalElement = document.getElementById("planModal");
    const planModal = new window.bootstrap.Modal(planModalElement);
    planModal.show();
  };

  return (
    <div className="container mt-5 containerEntrenadores">
      <ul className="list-group mb-5">
        {store.entrenadores.map((entrenador, index) => (
          <li key={index} className="list-group-item bg-dark text-light">
            <div className="row align-items-center">
              <div className="fotoContainer col-4">
                <Link to={`/listaentrenadores/${entrenador.id}`}>
                  <img src={entrenador.foto} alt="User" className="fotoMiniEntrenador" />
                </Link>
              </div>
              <div className="col-8 overflow-hidden">
                <p className="Nombre">Nombre: {entrenador.nombre}</p>
                <p>Edad: {entrenador.edad}</p>
                <p>Género: {entrenador.genero}</p>
                <p>Tipo de entrenamiento: {entrenador.tipo_entrenamiento}</p>
                <div className="mt-2">
                  {usuario_id && user_role !== "entrenador" ? (
                    <button type="button" className="btnContratame" onClick={() => openPlanModal(entrenador.id)}>Contrátame</button>
                  ) : (
                    <p className="text-danger">Debes estar registrado para contratar a un entrenador</p>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="modal fade" id="planModal" tabIndex="-1" aria-labelledby="planModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="planModalLabel">Selecciona tu plan</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <button type="button" className="btnPlanes" onClick={() => selectPlan('semanal')}>Plan Semanal</button>
              <button type="button" className="btnPlanes" onClick={() => selectPlan('mensual')}>Plan Mensual</button>
              <button type="button" className="btnPlanes" onClick={() => selectPlan('anual')}>Plan Anual</button>
              <button type="button" className="btnContratar" onClick={contratarEntrenador}>Contratar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="felicidadesModal" tabIndex="-1" aria-labelledby="felicidadesModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="felicidadesModalLabel">¡FELICIDADES!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ¡Empezaste una nueva vida!
            </div>
            <div className="modal-footer">
              <button type="button" className="btnContratar" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};