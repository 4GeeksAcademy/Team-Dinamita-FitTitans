import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/Rutinas.css";

export const Rutinas = () => {
    const { actions } = useContext(Context);
    const { cliente_id, usuario_id } = useParams();
    const [comidas, setComidas] = useState([]);
    const [nuevaComida, setNuevaComida] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editComida, setEditComida] = useState("");

    useEffect(() => {
        const fetchRutina = async () => {
            const resultado = await actions.obtenerRutina(cliente_id);
            if (resultado.success) {
                setComidas(resultado.rutina || []);
            } else {
                setMensaje(`Error: ${resultado.error}`);
            }
        };
        fetchRutina();
    }, [cliente_id, actions]);

    const manejarAgregarRutina = () => {
        if (nuevaComida.trim()) {
            const nuevasComidas = [nuevaComida, ...comidas];
            setComidas(nuevasComidas);
            setNuevaComida("");
        } else {
            setMensaje("Por favor ingresa una rutina válida");
        }
    };

    const manejarGuardarRutina = async () => {
        const resultado = await actions.actualizarRutina(cliente_id, comidas);
        if (resultado.success) {
            setMensaje("Rutina guardada correctamente");
        } else {
            setMensaje(`Error: ${resultado.error}`);
        }
    };

    const manejarEliminarRutina = (index) => {
        const nuevasComidas = comidas.filter((_, i) => i !== index);
        setComidas(nuevasComidas);
    };

    const manejarEditarRutina = (index) => {
        setEditIndex(index);
        setEditComida(comidas[index]);
    };

    const manejarGuardarEdicion = () => {
        const nuevasComidas = comidas.map((comida, index) =>
            index === editIndex ? editComida : comida
        );
        setComidas(nuevasComidas);
        setEditIndex(null);
        setEditComida("");
    };

    const manejarCancelarEdicion = () => {
        setEditIndex(null);
        setEditComida("");
    };

    return (
        <div className="containerPrincipalDieta">
            <div className="contenedorTituloDietaPrivada">
                <div className="tituloDietaPrivada">
                    RUTINA
                </div>
            </div>
            <div className="formularioDieta">
                <textarea
                    value={nuevaComida}
                    onChange={(e) => setNuevaComida(e.target.value)}
                    placeholder="Ingrese una rutina"
                    rows={4}
                    cols={50}
                />
                <button onClick={manejarAgregarRutina}>Agregar Rutina</button>
                {mensaje && <p className="mensajeDieta">{mensaje}</p>}
                <div className="listaComidas">
                    {comidas.map((comida, index) => (
                        <div key={index} className="comidaItem">
                            {editIndex === index ? (
                                <div>
                                    <textarea
                                        value={editComida}
                                        onChange={(e) => setEditComida(e.target.value)}
                                        rows={4}
                                        cols={50}
                                    />
                                    <button onClick={manejarGuardarEdicion}>Guardar</button>
                                    <button onClick={manejarCancelarEdicion}>Cancelar</button>
                                </div>
                            ) : (
                                <div>
                                    <pre>{comida}</pre>
                                    <div className="botonesEditarEliminar">
                                        <button onClick={() => manejarEditarRutina(index)}>Editar</button>
                                        <button onClick={() => manejarEliminarRutina(index)}>Eliminar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={manejarGuardarRutina}>Guardar Rutina</button>
            </div>

        </div>
    );
};
