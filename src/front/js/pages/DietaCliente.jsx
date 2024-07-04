import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/DietaCliente.css";
import { motion } from 'framer-motion';

export const DietaCliente = () => {
    const { actions } = useContext(Context);
    const { usuario_id } = useParams();
    const [comidas, setComidas] = useState([]);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const fetchDietaCliente = async () => {
            const resultado = await actions.obtenerDietaCliente(usuario_id);
            if (resultado.success) {
                setComidas(resultado.dieta || []);
            } else {
                setMensaje(`Error: ${resultado.error}`);
            }
        };
        fetchDietaCliente();
    }, [usuario_id, actions]);

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
                    MI DIETA
                </div>
            </div>
            <div className="listaComidas">
                {mensaje && <p className="mensajeDieta">{mensaje}</p>}
                {comidas.length > 0 ? (
                    comidas.map((comida, index) => (
                        <div key={index} className="comidaItem">
                            <pre>{comida}</pre>
                        </div>
                    ))
                ) : (
                    <p>No hay comidas en tu dieta</p>
                )}
            </div>
        </div>

        </motion.div>
        </>
    );
};
