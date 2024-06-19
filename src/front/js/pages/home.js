import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { set } from "@cloudinary/url-gen/actions/variable";
import { Registro } from "../component/Registro.js";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const tipEntrenamiento = [
		"Mantente hidratado durante tus entrenamientos.",
		"Calienta antes de comenzar tu rutina de ejercicios.",
		"Mantén una buena postura para evitar lesiones.",
		"Incluye una variedad de ejercicios en tu rutina."
	];

	const generarTipEntrenamiento = () => {
		return tipEntrenamiento[Math.floor(Math.random() * tipEntrenamiento.length)];
	};

	const [tipEntreno, setTipEntreno] = useState(generarTipEntrenamiento());

	const clickGenerarTipEntreno = () => {
		setTipEntreno(generarTipEntrenamiento());
	};

	const tipsNutricion = [
		"Consume una dieta rica en frutas y verduras.",
		"Incluye proteínas magras en cada comida.",
		"Asegúrate de beber suficiente agua durante el día.",
		"Limita la ingesta de alimentos procesados y azucarados."
	];

	const generarTipNutricion = () => {
		return tipsNutricion[Math.floor(Math.random() * tipsNutricion.length)];
	};

	const [tipNutricion, setTipNutricion] = useState(generarTipNutricion());

	const clickGenerarTipNutricion = () => {
		setTipNutricion(generarTipNutricion());
	};
	const token = localStorage.getItem("jwt-token")
	const [estado, setEstado] = useState(null);
	const [rol, setRol] = useState(null);
	const roles = localStorage.getItem("user_rol")

	useEffect(()=>{
		if (token){
			setEstado(false)
		}else {setEstado(true)}

		if(roles === "true") {
			setRol(true)
		}else {setRol(false)}
	}, [token, estado])
	return (
		<>
		{estado ? (
		<div className="container-fluid">
			<div className="row row-fila1">
				<div className="col-md-7 col-columna1">
					<div className="titulo1">
						¿Buscas entrenadores/as personales
						<br />
						profesionales?
						<div className="subTitulo1">
							Este es el espacio donde encontraras preparadores físicos y nutricionistas para cumplir tus objetivos.
						</div>
						<div className="botonConoceNuestrosEntrenadores">
							<Link to="/listaentrenadores">
								<button className="btn btn-ConoceEntrenadores">Conoce Nuestros Entrenadores</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="col-md-1"></div>
				<div className="col-md-4 col-columna2">
					<div className="titulo2">
						¿Eres entrenador/a?
						<div className="subTitulo2">
							Potencia tu entrenamiento personal con nuestra app.
							<br />
							Ven y forma parte de nuestro equipo
						</div>
						<div className="botonRegistrarEntrenador">
							<Link to="/">
								<button className="btn btn-RegistrarEntrenador" onClick={openModal}>Registrate</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="row row-fila2">
				<div className="col-md-4 col-columna3">
					<div className="tituloTipsEntrenamiento">
						TIP DE ENTRENAMIENTO
					</div>
					<div className="tipEntrenamiento">
						{tipEntreno}
					</div>
					<div className="botonNuevoTipEntrenamiento">
						<button className="btn-tipEntrenamientoNuevo" onClick={clickGenerarTipEntreno}>Nuevo tip</button>
					</div>
				</div>
				<div className="col-md-4 col-columna4">
					<div className="tituloCalculaCalorias">
						<Link to="/formulacalorias" className="linkHomeCalculaCalorias">CALCULA TUS CALORIAS DIARIAS</Link>
					</div>
				</div>
				<div className="col-md-4 col-columna5">
					<div className="tituloTipsNutricion">
						TIP DE NUTRICIÓN
					</div>
					<div className="tipNutricion">
						{tipNutricion}
					</div>
					<div className="botonNuevoTipNutricion">
						<button className="btn-tipNutricionNuevo" onClick={clickGenerarTipNutricion}>Nuevo tip</button>
					</div>
				</div>
			</div>
		</div>) : 
		(
			<div className="container-fluid">
			<div className="row row-fila1">
				<div className="col-md col-columna1">
					<div className="titulo1">
						 Entrenadores/as personales
						<br />
						profesionales
						<div className="subTitulo1">
							Este es el espacio donde encontraras preparadores físicos y nutricionistas para cumplir tus objetivos.
						</div>
						<div className="botonConoceNuestrosEntrenadores">
							<Link to={rol?  "/listaclientes" : "/listaentrenadores"}>
								<button className="btn btn-ConoceEntrenadores">{rol ? "Eres Entrenador, Mira Clientes" : "Conoce Los Entrenadores"}</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="row row-fila2">
				<div className="col-md-4 col-columna3">
					<div className="tituloTipsEntrenamiento">
						TIP DE ENTRENAMIENTO
					</div>
					<div className="tipEntrenamiento">
						{tipEntreno}
					</div>
					<div className="botonNuevoTipEntrenamiento">
						<button className="btn-tipEntrenamientoNuevo" onClick={clickGenerarTipEntreno}>Nuevo tip</button>
					</div>
				</div>
				<div className="col-md-4 col-columna4">
					<div className="tituloCalculaCalorias">
						<Link to="/formulacalorias" className="linkHomeCalculaCalorias">CALCULA TUS CALORIAS DIARIAS</Link>
					</div>
				</div>
				<div className="col-md-4 col-columna5">
					<div className="tituloTipsNutricion">
						TIP DE NUTRICIÓN
					</div>
					<div className="tipNutricion">
						{tipNutricion}
					</div>
					<div className="botonNuevoTipNutricion">
						<button className="btn-tipNutricionNuevo" onClick={clickGenerarTipNutricion}>Nuevo tip</button>
					</div>
				</div>
			</div>
		</div>
		)}
		{isModalOpen && <Registro closeModal={closeModal} />}
		</>
	);
};
