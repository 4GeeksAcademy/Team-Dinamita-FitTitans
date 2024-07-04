import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/RutinaCliente.css'; 
import { motion } from 'framer-motion';
import {Toaster, toast } from 'sonner';

export const RutinaCliente = () => {
    const { actions } = useContext(Context);
    const { usuario_id } = useParams();
    const [rutinas, setRutinas] = useState([]);
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        const fetchRutinaCliente = async () => {
            const resultado = await actions.obtenerRutina(usuario_id);
            if (resultado.success) {
                setRutinas(resultado.rutina || []);
            } else {
                setMensaje(`Error: ${resultado.error}`);
                toast.error("no hay rutinas")
            }
        };
        fetchRutinaCliente();
    }, [usuario_id, actions]);

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
                    MI RUTINA
                </div>
            </div>
            <div className="listaRutinas">
                {mensaje && <p className="mensajeRutina">{mensaje}</p>}
                {rutinas.length > 0 ? (
                    rutinas.map((rutina, index) => (
                        <div key={index} className="rutinaItem">
                            <pre>{rutina}</pre>
                        </div>
                    ))
                ) : (
                    <p>No hay rutinas en tu plan</p>
                )}
            </div>
        </div>

        </motion.div>
        </>
    );
};
