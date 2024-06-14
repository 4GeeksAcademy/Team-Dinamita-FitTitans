import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/MiAreaRegistrado.css"


export const MiAreaRegistrado = () => {
	const [sesion, setSession] = useState(null)

	return (
		<div className="container contenedorMiAreaRegistrado">
			<div className="tituloMiAreaRegistrado">
				MI AREA
			</div>
			<div className="row row-filaMiAreaRegistrado">
				<div className="col-md-4 columnaPerfilRegistrado ">
					<div className="tituloPerfilRegistrado">
						<Link to="/" className="linkPerfilRegistrado">PERFIL</Link>
					</div>
				</div>
				<div className="col-md-4 columnaConoceEntrenadoresRegistrado">
					<div className="tituloConoceEntrenadoresRegistrado">
						<Link to="/listaentrenadores" className="linkConoceEntrenadoresRegistrado">NUESTROS ENTRENADORES/AS</Link>
					</div>
				</div>
				<div className="col-md-4 columnaCalculaCaloriasRegistrado">
					<div className="tituloCalculaCaloriasRegistrado">
						<Link to="/formulacalorias" className="linkCalculaCaloriasRegistrado">CALCULA TUS CALORIAS</Link>
					</div>
				</div>
			</div>
		</div>
	)
};