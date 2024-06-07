import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/perfilEntrenador.css";



export const PerfilEntrenador = () => {
	const [showFelicidades, setShowFelicidades] = useState(false);

	const selectPlan = (plan) => {
		setShowFelicidades(true);
		// Cierra el modal de planes
		const planModalElement = document.getElementById("planModal");
		const planModal = new window.bootstrap.Modal(planModalElement);
		planModal.hide();
		// Abre el modal de felicitaciones
		const felicidadesModalElement = document.getElementById("felicidadesModal");
		const felicidadesModal = new window.bootstrap.Modal(felicidadesModalElement);
		felicidadesModal.show();
	};

	return (
		<div>
			<nav className="navbarEntrenador">
				<div className="container-fluidEntrenador d-flex justify-content-center">
					<span className="navbarNombre">ALEX GONZALEZ Trainer</span>
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
								<h5 className="card-title">Certificados y Titulaciones</h5>
								<p className="card-textEntrenador">Titulo de entrenador skjdgkjfsg</p>
								<p className="card-textEntrenador">Titulo de entrenador skjdgkjfsg</p>
								<p className="card-textEntrenador">Titulo de entrenador skjdgkjfsg</p>
							</div>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Tipos de Entrenamiento</h5>
								<p className="card-textEntrenador">Entrenamiento de fuerza</p>
								<p className="card-textEntrenador">Entrenamiento para adelgazar</p>
								<p className="card-textEntrenador">Entrenamiento Boxeo</p>
								<p className="card-textEntrenador">Entrenamiento </p>
							</div>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Podemos alcanzarlo juntos</h5>
								<p className="card-textEntrenador">El último paso para poder estar más cerca de tu nuevo estilo de vida</p>
								<button type="button" className="btnContratame" data-bs-toggle="modal" data-bs-target="#planModal">Contrátame</button>
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
							<button type="button" className="btnPlanes" onClick={() => selectPlan('semanal')}>Plan Semanal</button>
							<button type="button" className="btnPlanes" onClick={() => selectPlan('mensual')}>Plan Mensual</button>
							<button type="button" className="btnPlanes" onClick={() => selectPlan('anual')}>Plan Anual</button>
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
							¡Empezamos nuestro camino para llegar a ser el GRAN TITAN!
						</div>
						<div className="modal-footer">
							<button type="button" className="btnCerrar" data-bs-dismiss="modal">Cerrar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};


