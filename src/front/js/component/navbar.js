import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import { Registro } from "./Registro";
import { Context } from "../store/appContext";
import logofittitans from "../../img/logofittitans.png";
import io from 'socket.io-client';

const socket = io(process.env.BACKEND_URL, {
	transports: ['websocket'], // Forzar la conexión a WebSocket
	query: {
		user_id: localStorage.getItem('user_id')
	}
});

//mport firebaseApp from "../../../firebase/credenciales";
//import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

//const auth = getAuth(firebaseApp);

export const Navbar = () => {
	const [inicioSesion, setInicioSesion] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { store, actions } = useContext(Context);
	const [tipoUsuario, setTipoUsuario] = useState(false);

	const navigate = useNavigate();

	/*nAuthStateChanged(auth, (usuarioFirebase) => {
		if (usuarioFirebase) {
			setinicioSesion(usuarioFirebase)
		} else {
			setinicioSesion(null)
		}
	})*/
	useEffect(() => {
		const token = actions.getToken();
		if (token) {

		} else { actions.logout() }
	}, [])

	useEffect(() => {
		const usuarioTipo = localStorage.getItem("user_rol");
		setTipoUsuario(usuarioTipo === "true");
	}, []);

	useEffect(() => {
		if (store.seInicio) {
			const usuarioTipo = localStorage.getItem("user_rol");
			setTipoUsuario(usuarioTipo === "true");
		}
	}, [store.seInicio]);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const cerrarSesion = (e) => {
		e.preventDefault();
		//signOut(auth);
		actions.logout();
		navigate("/")
		setTipoUsuario(false)
		// Función de limpieza al desmontar el componente
		socket.disconnect();

	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 navbarPrincipal fixed-top">
				<div className="nombreWeb">
					<Link className="noSubrayadoLink" to="/">
						<img src={logofittitans} alt="Fit Titans Logo" className="logoFitTitans" />
					</Link>
				</div>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<div className="botonesNavbar navbar-nav ms-auto">

						<div className="botonNavbar">
							<Link to={tipoUsuario ? "/listaclientes" : "/listaentrenadores"}>
								<button className="btn btn-Navbar">{tipoUsuario ? "Lista Usuarios" : "Lista Entrenadores"}</button>
							</Link>
						</div>
						{store.seInicio ? (
							<>
								<div className="botonNavbar">
									<Link to="/miarea">
										<button className="btn btn-Navbar">Mi área</button>
									</Link>
								</div>
								<div className="botonNavbar">
									<button className="btn btn-Navbar" onClick={cerrarSesion}>
										Cerrar sesión
									</button>
								</div>
							</>
						) : (
							<>
								<div className="botonNavbar">
									<Link to="/">
										<button className="btn btn-Navbar" onClick={openModal}>Mi Área</button>
									</Link>
								</div>
								<div className="botonNavbar">
									<Link to="/contactanos">
										<button className="btn btn-Navbar">Contáctanos</button>
									</Link>
								</div>
								<div className="botonNavbar">
									<button className="btn btn-Navbar" onClick={openModal}>
										Registrarse
									</button>
								</div>
								<div className="botonNavbar">
									<Link to="/login">
										<button className="btn btn-Navbar">Iniciar Sesión</button>
									</Link>
								</div>
							</>
						)}
					</div>
				</div>
			</nav>
			{isModalOpen && <Registro closeModal={closeModal} />}
		</>
	);
};

