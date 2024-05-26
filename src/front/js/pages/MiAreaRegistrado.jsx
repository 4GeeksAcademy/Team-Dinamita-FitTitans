import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/MiAreaRegistrado.css";


export const MiAreaRegistrado = () => {

	return (
		<div className="container">
			<div className="row row-filaMiAreaRegistrado">
				<div className="col-md-4 columnaPerfilRegistrado">
					<div className="tituloPerfilRegistrado">
						<Link to="/" className="linkPerfilRegistrado">PERFIL USUARIO</Link>
					</div>
				</div>
				<div className="col-md-4 columnaConoceEntrenadoresRegistrado">
					<div className="tituloConoceEntrenadoresRegistrado">
						<Link to="/" className="linkConoceEntrenadoresRegistrado">CONOCE NUESTROS ENTRENADORES</Link>
					</div>
				</div>
				<div className="col-md-4 columnaCalculaCaloriasRegistrado">
					<div className="tituloCalculaCaloriasRegistrado">
						<Link to="/" className="linkCalculaCaloriasRegistrado">CALCULA TUS CALORIAS</Link>
					</div>
				</div>
			</div>
		</div>
	);
};