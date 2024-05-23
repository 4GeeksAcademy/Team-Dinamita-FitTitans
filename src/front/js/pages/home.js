import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
			
				<div className="container">
					<h1>Entrena y Transforma tu Cuerpo</h1>
					<p>Únete a nuestra comunidad de fitness y alcanza tus objetivos.</p>
				</div>		
		</div>
	);
};
