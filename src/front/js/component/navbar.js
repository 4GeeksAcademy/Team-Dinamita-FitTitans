import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import { Registro } from "./Registro";

import firebaseApp from "../../../firebase/credenciales";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth(firebaseApp);

export const Navbar = () => {
	const [test, setTest] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	onAuthStateChanged(auth, (usuarioFirebase) => {
		if (usuarioFirebase) {
			setTest(usuarioFirebase)
		} else {
			setTest(null)
		}
	})

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const cerrarSesion = (e) => {
		e.preventDefault();
		signOut(auth);
		setTest(null);
		navigate("/")
	}

	return (
		<>
			<nav className="navbar navbarPrincipal navbar-dark bg-dark p-3">
				<div className="nombreWeb">
					<Link className="noSubrayadoLink" to="/">
						<span className="logo">FIT TITANS</span>
					</Link>
				</div>
				{test ? (
					<div className="botonesNavbar">
						<div className="botonNavbar">
							<Link to="/listaentrenadores">
								<button className="btn btn-Navbar">Lista Entrenadores</button>
							</Link>
						</div>
						<div className="botonNavbar">
							<Link to="/miarea/registrado">
								<button className="btn btn-Navbar">Mi area</button>
							</Link>
						</div>
						<div className="botonNavbar">
							<button
								className="btn btn-Navbar"
								onClick={cerrarSesion}
							>
								Cerrar sesionnnnn
							</button>
						</div>
					</div>
				) : (
					<div className="botonesNavbar">
						<div className="botonNavbar">
							<Link to="/listaentrenadores">
								<button className="btn btn-Navbar">Lista Entrenadores</button>
							</Link>
						</div>
						<div className="botonNavbar">
							<Link to="/">
								<button className="btn btn-Navbar" onClick={openModal}>Mi Area</button>
							</Link>
						</div>
						<div className="botonNavbar">
							<Link to="/contactanos">
								<button className="btn btn-Navbar">Contactanos</button>
							</Link>
						</div>
						<div className="botonNavbar">
							<button className="btn btn-Navbar" onClick={openModal}>
								Registrarse
							</button>
						</div>
						<div className="botonNavbar">
							<Link to="/login">
								<button className="btn btn-Navbar">Iniciar Sesion</button>
							</Link>
						</div>
					</div>
				)}
			</nav>
			{isModalOpen && <Registro closeModal={closeModal} />}
		</>
	);
};
