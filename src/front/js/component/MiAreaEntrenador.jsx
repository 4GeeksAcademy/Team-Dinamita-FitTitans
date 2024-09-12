import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/MiAreaEntrenador.css";
import { motion } from 'framer-motion';

export const MiAreaEntrenador = () => {
    const usuarioID = localStorage.getItem("user_id");
    return (
        <>
        <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

        <div className="container contenedorMiAreaEntrenador">
            <div className="tituloMiAreaEntrenador">
                MI AREA
            </div>
            <div className="row row-filaMiAreaEntrenador">
                <div className="col-md-4 columnaPerfilEntrenador">
                    <div className="tituloPerfilRegistrado">
                        <Link to={`/perfiles/${usuarioID}`} className="linkPerfilEntrenador">PERFIL</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaClientesDelEntrenador">
                    <div className="tituloClientesDelEntrenador">
                        <Link to={`/entrenador/${usuarioID}/clientes`} className="linkClientesDelEntrenador">CLIENTES</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaVideosEntrenamientoEntrenador">
                    <div className="tituloVideosEntrenamientoEntrenador">
                        <Link to={`/videosentrenador/${usuarioID}`} className="linkVideosEntrenamientoEntrenador">VIDEOS DE ENTRENAMIENTO</Link>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
        </>
    )
};