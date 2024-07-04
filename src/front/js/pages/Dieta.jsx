import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/Dieta.css';
import { motion } from 'framer-motion';

export const Dieta = () => {
    const { actions } = useContext(Context);
    const { cliente_id, usuario_id } = useParams();
    const [comidas, setComidas] = useState([]);
    const [nuevaComida, setNuevaComida] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editComida, setEditComida] = useState("");

    useEffect(() => {
        const fetchDieta = async () => {
            const resultado = await actions.obtenerDieta(cliente_id);
            if (resultado.success) {
                setComidas(resultado.dieta || []);
            } else {
                setMensaje(`Error: ${resultado.error}`);
            }
        };
        fetchDieta();
    }, [cliente_id, actions]);

    const manejarAgregarComida = () => {
        if (nuevaComida.trim()) {
            const nuevasComidas = [nuevaComida, ...comidas];
            setComidas(nuevasComidas);
            setNuevaComida("");
        } else {
            setMensaje("Por favor ingresa una comida válida");
        }
    };

    const manejarGuardarDieta = async () => {
        const resultado = await actions.actualizarDieta(cliente_id, comidas);
        if (resultado.success) {
            setMensaje("Dieta guardada correctamente");
        } else {
            setMensaje(`Error: ${resultado.error}`);
        }
    };

    const manejarEliminarComida = (index) => {
        const nuevasComidas = comidas.filter((_, i) => i !== index);
        setComidas(nuevasComidas);
    };

    const manejarEditarComida = (index) => {
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
        <>
        <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

        <div className="containerPrincipalDieta">
            <div className="contenedorTituloDietaPrivada">
                <div className="tituloDietaPrivada">
                    DIETA
                </div>
            </div>
            <div className="formularioDieta">
                <textarea
                    value={nuevaComida}
                    onChange={(e) => setNuevaComida(e.target.value)}
                    placeholder="Ingrese una comida"
                    rows={4}
                    cols={50}
                />
                <button onClick={manejarAgregarComida}>Agregar Comida</button>
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
                                        <button onClick={() => manejarEditarComida(index)}>Editar</button>
                                        <button onClick={() => manejarEliminarComida(index)}>Eliminar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={manejarGuardarDieta}>Guardar Dieta</button>
            </div>

        </div>

        </motion.div>
        </>
    );
};