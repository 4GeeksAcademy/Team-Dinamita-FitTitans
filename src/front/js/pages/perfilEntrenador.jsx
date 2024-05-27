import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/perfilEntrenador.css";






export const PerfilEntrenador = () => {

	return (
		<div>
			<nav className="navbar navbar-light bg-light">
				<div className="container-fluid">
					<span className="navbar-brand mb-0 h1">ALEX GONZALEZ Trainer</span>
				</div>
			</nav>


			<div id="carouselEntrenador" className="carousel slide" data-bs-ride="carousel">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src="https://img.freepik.com/foto-gratis/personas-que-trabajan-interior-junto-pesas_23-2149175410.jpg?t=st=1716577962~exp=1716581562~hmac=efeb15346fd767f7436c6f167082b61ff2eafdb017273cfd15420c1b13424486&w=826" className="d-block w-100" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Conoce a tu entrenador</h5>
							<p>Puedes entrenar desde donde quieras</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://img.freepik.com/foto-gratis/mujer-porcion-hombre-gimnasio_23-2149627070.jpg?t=st=1716578060~exp=1716581660~hmac=26ce5510c2fa5f78b8a4e7b12909568e324ca40a684399a4da786842667d3943&w=826" className="d-block w-100" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Second slide label</h5>
							<p>Some representative placeholder content for the second slide.</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src="..." className="d-block w-100" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Third slide label</h5>
							<p>Some representative placeholder content for the third slide.</p>
						</div>
					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
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
								<p className="card-text">Titulo de entrenador skjdgkjfsg</p>
								<p className="card-text">Titulo de entrenador skjdgkjfsg</p>
								<p className="card-text">Titulo de entrenador skjdgkjfsg</p>
							</div>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Tipos de Entrenamiento</h5>
								<p className="card-text">Entrenamiento de fuerza</p>
								<p className="card-text">Entrenamiento para adelgazar</p>
								<p className="card-text">Entrenamiento Boxeo</p>
								<p className="card-text">Entrenamiento </p>
							</div>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Podemos alcanzarlo juntos</h5>
								<p className="card-text">El último paso para poder estar más cerca de tu nuevo estilo de vida</p>
								<a href=" AQUI LINKEAMOS A LA PASARELA DE PAGO" className="btn btn-primary">Contratame </a>
							</div>
						</div>
					</div>
				</div>
			</div>


		</div>




	);
};
