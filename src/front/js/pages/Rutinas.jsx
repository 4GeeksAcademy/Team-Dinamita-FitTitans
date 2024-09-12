import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/Rutinas.css";
import { motion } from 'framer-motion';
import { Toaster, toast } from "sonner";

export const Rutinas = () => {
    const { actions } = useContext(Context);
    const { cliente_id, usuario_id } = useParams();
    const [rutinas, setRutinas] = useState([]);
    const [nuevaRutina, setNuevaRutina] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editRutina, setEditRutina] = useState("");

    useEffect(() => {
        const fetchRutina = async () => {
            const resultado = await actions.obtenerRutina(cliente_id);
            if (resultado.success) {
                setRutinas(resultado.rutina || []);
            } else {
                setMensaje(`Error: ${resultado.error}`);
            }
        };
        fetchRutina();
    }, [cliente_id, actions]);

    const manejarAgregarRutina = () => {
        if (nuevaRutina.trim()) {
            const nuevasRutinas = [nuevaRutina, ...rutinas];
            setRutinas(nuevasRutinas);
            setNuevaRutina("");
        } else {
            setMensaje("Por favor ingresa una rutina válida");
            toast.error("ingresa rutina valida")
        }
    };

    const manejarGuardarRutina = async () => {
        const resultado = await actions.actualizarRutina(cliente_id, rutinas);
        if (resultado.success) {
            setMensaje("Rutina guardada correctamente");
        } else {
            setMensaje(`Error: ${resultado.error}`);
        }
    };

    const manejarEliminarRutina = (index) => {
        const nuevasRutinas = rutinas.filter((_, i) => i !== index);
        setRutinas(nuevasRutinas);
    };

    const manejarEditarRutina = (index) => {
        setEditIndex(index);
        setEditRutina(rutinas[index]);
    };

    const manejarGuardarEdicion = () => {
        const nuevasRutinas = rutinas.map((rutina, index) =>
            index === editIndex ? editRutina : rutina
        );
        setRutinas(nuevasRutinas);
        setEditIndex(null);
        setEditRutina("");
    };

    const manejarCancelarEdicion = () => {
        setEditIndex(null);
        setEditRutina("");
    };

    return (
        <>
        <Toaster position="top-center" richColors/>
        <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

        <div className="containerPrincipalRutina">
            <div className="contenedorTituloRutinaPrivada">
                <div className="tituloRutinaPrivada">
                    RUTINA
                </div>
            </div>
            <div className="formularioRutina">
                <textarea
                    value={nuevaRutina}
                    onChange={(e) => setNuevaRutina(e.target.value)}
                    placeholder="Ingrese una rutina"
                    rows={4}
                    cols={50}
                />
                <button onClick={manejarAgregarRutina}>Agregar Rutina</button>
                {mensaje && <p className="mensajeRutina">{mensaje}</p>}
                <div className="listaRutinas">
                    {rutinas.map((rutina, index) => (
                        <div key={index} className="rutinaItem">
                            {editIndex === index ? (
                                <div>
                                    <textarea
                                        value={editRutina}
                                        onChange={(e) => setEditRutina(e.target.value)}
                                        rows={4}
                                        cols={50}
                                    />
                                    <button onClick={manejarGuardarEdicion}>Guardar</button>
                                    <button onClick={manejarCancelarEdicion}>Cancelar</button>
                                </div>
                            ) : (
                                <div>
                                    <pre>{rutina}</pre>
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

        </motion.div>
        </>
    );
};
