import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark p-3">
			<div className="nombreWeb">
				<Link className="noSubrayadoLink" to="/">
					<span className="logo">FIT TITANS</span>
				</Link>
			</div>
			<div className="botonesNavbar">
				<div className="botonNavbar">
					<Link to="/">
						<button className="btn btn-Navbar">Perfil Entrenador</button>
					</Link>
				</div>
				<div className="botonNavbar">
					<Link to="/">
						<button className="btn btn-Navbar">Registrarse</button>
					</Link>
				</div>
				<div className="botonNavbar">
					<Link to="/">
						<button className="btn btn-Navbar">Iniciar Sesion</button>
					</Link>
				</div>
			</div >
		</nav >
	);
};