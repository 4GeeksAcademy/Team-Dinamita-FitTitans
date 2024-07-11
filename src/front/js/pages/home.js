import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Registro } from "../component/Registro.js";
import { motion } from 'framer-motion';

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

	useEffect(() => {
		if (token) {
			setEstado(false)
		} else { setEstado(true) }

		if (roles === "true") {
			setRol(true)
		} else { setRol(false) }
	}, [token, estado])
	return (
		<>
		<motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>
			{estado ? (
				<div className="container-fluid">
					<div className="row row-fila1">
						<div className="col-md-7 col-columna1">
							<div className="titulo1">
								Encuentra los mejores entrenadores personales y nutricionistas
								<br />
								<div className="subTitulo1">
								Transforma tu vida, un entrenamiento a la vez.
								</div>
								<div className="botonConoceNuestrosEntrenadores">
									<Link to="/listaentrenadores">
										<button className="btn btn-ConoceEntrenadores">Conoce Nuestros Entrenadores</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-md-5 col-columna2">
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
					<div className="row row-fila2" >
						<div className="col-md-4 col-columna3" >
						<div id="cuadroentreno">
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
						</div>
						<div className="col-md-4 col-columna4">
							<div className="tituloCalculaCalorias">
								<Link to="/formulacalorias" className="linkHomeCalculaCalorias">CALCULA TUS CALORIAS DIARIAS</Link>
							</div>
						</div>
						<div className="col-md-4 col-columna5">
						<div id="cuadroentreno">
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
				</div>) :
				(
					<div className="container-fluid">
						<div className="row row-fila1">
							<div className="col-md col-columna1">
								<div className="titulo1">
									¡Bienvenido a Fit Titans!.
									<div className="subTitulo1">
										Aquí encontrarás a los mejores entrenadores personales y nutricionistas listos para ayudarte a alcanzar tus metas. Tu viaje hacia una vida más saludable y en forma comienza ahora.
									</div>
									<div className="botonConoceNuestrosEntrenadores">
										<Link to={rol ? "/listaclientes" : "/listaentrenadores"}>
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
		</motion.div>
		</>
	);
};
