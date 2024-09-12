import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/ListaEntrenadores.css";
import { motion } from 'framer-motion';

export const ListaEntrenadores = () => {
  const { store, actions } = useContext(Context);
  const [seleccionarPlan, setSeleccionarPlan] = useState(null);
  const [currentEntrenadorId, setCurrentEntrenadorId] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showFelicidades, setShowFelicidades] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const usuario_id = localStorage.getItem("user_id");
  const user_role = localStorage.getItem("user_role");
  const [manejar, setManejar] = useState(null)

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

  useEffect(() => {
    const verificar = actions.obtenerListaEntrenadores()
    if (verificar){
      setManejar(false)
    }else{
      setManejar(true)
    }
  })
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
    setSelectedPlan(plan);
  };

  const openPlanModal = (entrenadorId) => {
    setCurrentEntrenadorId(entrenadorId);
    const planModalElement = document.getElementById("planModal");
    const planModal = new window.bootstrap.Modal(planModalElement);
    planModal.show();
  };

  return (
    <>
    <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>
    {manejar ? (
      <div className="container mt-5 " id="sinEntrenador">
        <p>no hay entrenadores aun</p>
      </div>
    ) : (
    <div className="container mt-5 containerEntrenadores">
      <ul className="list-group mb-5 contenedortarjetalistaEntrenadores1">
        {store.entrenadores.map((entrenador, index) => (
          <li key={index} className="list-group-item bg-dark text-light contenedortarjetalistaEntrenadores2">
            <div className="row align-items-start align-items-md-center">
              <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center align-items-center">
                <img src={entrenador.foto} alt="User" className="fotoMiniEntrenador" />
              </div>
              <div className="col-md-8">
                <div className="nombreListaEntrenadores">
                  <p className="Nombre">{entrenador.nombre}</p>
                </div>
                <div className="infoListaEntrenadores">
                  <p>Edad: {entrenador.edad}</p>
                </div>
                <div className="infoListaEntrenadores">
                  <p>Altura: {entrenador.altura}</p>
                </div>
                <div className="infoListaEntrenadores">
                  <p>Género: {entrenador.genero}</p>
                </div>
                <div className="infoListaEntrenadores">
                  <p>Tipo de entrenamiento: {entrenador.tipo_entrenamiento}</p>
                </div>
                <div className="mt-2 contenedorBotonContratame">
                  {usuario_id && user_role !== "entrenador" ? (
                    <button type="button" className="btnContratame" onClick={() => openPlanModal(entrenador.id)}>Contrátame</button>
                  ) : (
                    <p className="text-danger">Debes estar registrado para contratar un entrenador</p>
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
              <div className="contenedorBotonesPlanes">
                <button
                  type="button"
                  className={`btnPlanes ${selectedPlan === 'semanal' ? 'selected' : ''}`}
                  onClick={() => selectPlan('semanal')}
                >
                  Plan Semanal
                </button>
                <button
                  type="button"
                  className={`btnPlanes ${selectedPlan === 'mensual' ? 'selected' : ''}`}
                  onClick={() => selectPlan('mensual')}
                >
                  Plan Mensual
                </button>
                <button
                  type="button"
                  className={`btnPlanes ${selectedPlan === 'anual' ? 'selected' : ''}`}
                  onClick={() => selectPlan('anual')}
                >
                  Plan Anual
                </button>
              </div>
              <div className="contenedorBotonContratar">
                <button type="button" className="btnContratarListaEntrenadores" onClick={contratarEntrenador}>Contratar</button>
              </div>
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
    </div>)}
    
    </motion.div>
    </>
  );
};