import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
			<div className="row row-fila1">
				<div className="col-md-7 col-columna1">
					<div className="titulo1">
						Busca entrenadores o entrenadoras personales
						<br />
						profesionales
						<div className="subTitulo1">
							El espacio donde encontraras preparadores físicos y nutricionistas para cumplir tus objetivos.
						</div>
						<div className="botonConoceNuestrosEntrenadores">
							<Link to="/">
								<button className="btn btn-ConoceEntrenadores">Conoce Nuestros Entrenadores</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="col-md-1"></div>
				<div className="col-md-4 col-columna2">
					<div className="titulo2">
						Eres entrenador
						<div className="subTitulo2">
							Potencia tu entrenamiento personal con nuestra app.
							<br />


							Ven y forma parte de nuestro equipo
						</div>
						<div className="botonRegistrarEntrenador">
							<Link to="/">
								<button className="btn btn-RegistrarEntrenador">Registrate</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="row row-fila2">
				<div className="col-md-4 col-columna3">
					<div className="titulo3">
						Tips de entrenamiento
					</div>
				</div>
				<div className="col-md-4 col-columna4">
					<div className="titulo4">
						Formula para sacar tus calorias
					</div>
				</div>
				<div className="col-md-4 col-columna5">
					<div className="titulo5">
						tips de nutricion
					</div>
				</div>
			</div>
		</div>
	);
};
