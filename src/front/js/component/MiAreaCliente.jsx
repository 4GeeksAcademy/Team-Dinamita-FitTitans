import React from "react";
import { Link } from 'react-router-dom';
import "../../styles/MiAreaCliente.css";
import { motion } from 'framer-motion';

export const MiAreaCliente = () => {
    const usuarioID = localStorage.getItem("user_id");

    
//{`/chat/${usuarioID}`} 
    return (
        <>
        <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>
        <div className="container contenedorMiAreaCliente">
            <div className="tituloMiAreaCliente">
                MI AREA
            </div>
            <div className="row row-filaMiAreaCliente">
                <div className="col-md-4 columnaMiAreaPerfilCliente">
                    <div className="tituloMiAreaPerfilCliente">
                        <Link to={`/perfiles/${usuarioID}`} className="linkPerfilCliente">PERFIL</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaDietaCliente">
                    <div className="tituloDietaCliente">
                        <Link to={`/cliente/dieta/${usuarioID}`} className="linkDietaCliente">DIETA</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaRutinasCliente">
                    <div className="tituloRutinasCliente">
                        <Link to={`/cliente/rutina/${usuarioID}`} className="linkRutinasCliente">RUTINAS</Link>
                    </div>
                </div>
            </div>
            <div className="row row-filaMiAreaCliente2">
                <div className="col-md-4 columnaChatCliente">
                    <div className="tituloChatCliente">
                        <Link to={`/chat/${usuarioID}`} className="linkChatCliente">CHAT</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaVideosEjercicios">
                    <div className="tituloVideosEjercicios">
                        <Link to={`/videousuario/${usuarioID}`} className="linkVideosEjercicios">VIDEOS DE EJERCICIOS</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaMiAreaCalculaCalorias">
                    <div className="tituloMiAreaCalculaCalorias">
                        <Link to="/formulacalorias" className="linkMiAreaCalculaCalorias">CALCULA TUS CALORIAS</Link>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
        </>
    );
};
