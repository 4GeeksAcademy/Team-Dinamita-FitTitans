
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/perfilEntrenador.css";

export const PerfilEntrenador = () => {
	const { store, actions } = useContext(Context);
	const { entrenador_id } = useParams();
	const [entrenador, setEntrenador] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showFelicidades, setShowFelicidades] = useState(false);
	const [seleccionarPlan, setSeleccionarPlan] = useState(null);
	const usuario_id = localStorage.getItem("user_id")
	const user_role = localStorage.getItem("user_role");

	useEffect(() => {
		if (entrenador_id) {
			actions.obtenerPerfilEntrenador(entrenador_id)
				.then(response => {
					if (!response.ok) {
						throw new Error('Error al obtener el perfil del entrenador');
					}
					return response.json();
				})
				.then(data => {
					setEntrenador(data);
					console.log(data)
				})

				.catch(error => {
					console.error("Error al obtener el perfil del entrenador:", error);
					setError(error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [entrenador_id, actions]);

	const contratarEntrenador = () => {
		if (!usuario_id) {
			setError(new Error("Debes estar registrado para contratar a un entrenador"));
			return;
		}
		actions.contratarEntrenador(entrenador_id, usuario_id, seleccionarPlan)
			.then(response => {
				if (response.error) {
					throw new Error(response.error);
				}
				setShowFelicidades(true);
				const felicidadesModalElement = document.getElementById("felicidadesModal");
				const felicidadesModal = new window.bootstrap.Modal(felicidadesModalElement);
				felicidadesModal.show();
			})
			.catch(error => {
				console.error("Error al contratar al entrenador:", error);
				setError(error);
			});
	};

	if (loading) {
		return <div>Cargando...</div>;
	}

	if (error) {
		return <div>Error al cargar los datos del entrenador: {error.message}</div>;
	}

	if (!entrenador) {
		return <div>Entrenador no encontrado</div>;
	}




	const selectPlan = (plan) => {
		setSeleccionarPlan(plan);
		const planModalElement = document.getElementById("planModal");
		const planModal = new window.bootstrap.Modal(planModalElement);
		planModal.hide();
	};



	return (
		<div>
			{error && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}
			<nav className="navbarEntrenador">
				<div className="container-fluidEntrenador d-flex justify-content-center">
					<span className="navbarNombre">{entrenador.nombre}</span>
				</div>
			</nav>

			<div id="carouselEntrenador" className="carousel slide" data-bs-ride="carousel">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselEntrenador" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselEntrenador" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselEntrenador" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src="https://img.freepik.com/foto-gratis/personas-que-trabajan-interior-junto-pesas_23-2149175410.jpg" className="fotoEntrenador" alt="..." />
						<div className="carousel-caption d-none d-md-block ">
							<h5>Conoce a tu entrenador</h5>
							<div className="descripcionCarrousel">Puedes entrenar desde donde quieras</div>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://img.freepik.com/foto-gratis/mujer-porcion-hombre-gimnasio_23-2149627070.jpg" className="fotoEntrenador" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Second slide label</h5>
							<div className="descripcionCarrousel"> Some representative placeholder content for the second slide </div>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://via.placeholder.com/800x400" className="fotoEntrenador" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Third slide label</h5>
							<p>Some representative placeholder content for the third slide.</p>
						</div>
					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselEntrenador" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselEntrenador" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>

			<blockquote className="blockquote">
				<h1>Tu tiempo vale mucho, y cuidar tu salud es la mejor inversión;</h1>
			</blockquote>

			<div className="container mt-5">
				<div className="row">
					<div className="col-sm-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Información Personal</h5>
								<p className="card-text">Email: {entrenador.email}</p>
								<p className="card-text">Edad: {entrenador.edad}</p>
								<p className="card-text">Género: {entrenador.genero}</p>
							</div>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Tipos de Entrenamiento</h5>
								<p className="card-text">{entrenador.tipo_entrenamiento}</p>
							</div>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Podemos alcanzarlo juntos</h5>
								<p className="card-textEntrenador">El último paso para poder estar más cerca de tu nuevo estilo de vida</p>
								{usuario_id && user_role !== "entrenador" ? (
									<button type="button" className="btnContratame" data-bs-toggle="modal" data-bs-target="#planModal">Contrátame</button>
								) : (
									<p className="text-danger">Debes estar registrado y no ser un entrenador para contratar a un entrenador</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="modal fade" id="planModal" tabIndex="-1" aria-labelledby="planModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="planModalLabel">Selecciona tu plan</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<button type="button" className="btnPlanes" onClick={() => { selectPlan('semanal'); }}>Plan Semanal</button>
							<button type="button" className="btnPlanes" onClick={() => { selectPlan('mensual'); }}>Plan Mensual</button>
							<button type="button" className="btnPlanes" onClick={() => { selectPlan('anual'); }}>Plan Anual</button>

							<button type="button" className="btnContratar" onClick={contratarEntrenador}>Contratar</button>
						</div>
					</div>
				</div>
			</div>

			<div className="modal fade" id="felicidadesModal" tabIndex="-1" aria-labelledby="felicidadesModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="felicidadesModalLabel">¡FELICIDADES!</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							¡Empezaste una nueva vida!
						</div>
						<div className="modal-footer">
							<button type="button" className="btnContratar" data-bs-dismiss="modal">Cerrar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

