import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";




export const perfilEntrenador = () => {

	return (
		<div id="carouselEntrenador" className="carousel slide" data-bs-ride="carousel">
			<div className="carousel-indicators">
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
			</div>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img src="https://www.freepik.es/foto-gratis/cerca-personas-entrenando-pelota_16691958.htm#fromView=search&page=1&position=4&uuid=f8a43057-2b0a-4794-8071-d2803c0461e1" className="d-block w-100" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Conoce a tu entrenador</h5>
							<p>Puedes entrenar desde donde quieras</p>
						</div>
				</div>
				<div className="carousel-item">
					<img src="..." className="d-block w-100" alt="..." />
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




	);
};
