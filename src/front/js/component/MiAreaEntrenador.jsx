import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/MiAreaEntrenador.css";


export const MiAreaEntrenador = () => {
    
    return (
        <div className="container contenedorMiAreaEntrenador">
            <div className="tituloMiAreaEntrenador">
                MI AREA
            </div>
            <div className="row row-filaMiAreaEntrenador">
                <div className="col-md-4 columnaPerfilEntrenador">
                    <div className="tituloPerfilRegistrado">
                        <Link to="/" className="linkPerfilEntrenador">PERFIL</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaClientesDelEntrenador">
                    <div className="tituloClientesDelEntrenador">
                        <Link to="/" className="linkClientesDelEntrenador">CLIENTES</Link>
                    </div>
                </div>
                <div className="col-md-4 columnaVideosEntrenamientoEntrenador">
                    <div className="tituloVideosEntrenamientoEntrenador">
                        <Link to="/" className="linkVideosEntrenamientoEntrenador">VIDEOS DE ENTRENAMIENTO</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};