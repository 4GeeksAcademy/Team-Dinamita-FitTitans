import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/MiAreaCliente.css";

export const MiAreaCliente = () => {

    return (
        <div className="container contenedorMiAreaCliente">
            <div className="tituloMiAreaCliente">
                MI AREA
            </div>
            <div className="row row-filaMiAreaCliente">
                <div className="col-md-4 columnaMiAreaPerfilCliente">
                    <div className="tituloMiAreaPerfilCliente">
                        <Link to="/" className="linkPerfilCliente">PERFIL</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaDietaCliente">
                    <div className="tituloDietaCliente">
                        <Link to="/" className="linkDietaCliente">DIETA</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaRutinasCliente">
                    <div className="tituloRutinasCliente">
                        <Link to="/rutinas" className="linkRutinasCliente">RUTINAS</Link>
                    </div>
                </div>
            </div>
            <div className="row row-filaMiAreaCliente2">
                <div className="col-md-4 columnaChatCliente">
                    <div className="tituloChatCliente">
                        <Link to="/" className="linkChatCliente">CHAT</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaVideosEjercicios">
                    <div className="tituloVideosEjercicios">
                        <Link to="/" className="linkVideosEjercicios">VIDEOS DE EJERCICIOS</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaMiAreaCalculaCalorias">
                    <div className="tituloMiAreaCalculaCalorias">
                        <Link to="/formulacalorias" className="linkMiAreaCalculaCalorias">CALCULA TUS CALORIAS</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
