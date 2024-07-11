import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import { Registro } from "./Registro";
import { Context } from "../store/appContext";
import logofittitans from "../../img/v2.2.png";
import { motion } from 'framer-motion';
import { Toaster, toast } from "sonner";



export const Navbar = () => {
	const [inicioSesion, setInicioSesion] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { store, actions } = useContext(Context);
	const [tipoUsuario, setTipoUsuario] = useState(false);

	const navigate = useNavigate();
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
			toast.success("bienvenido")
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
	};

	return (
		<>
		<Toaster  position="top-center" richColors />
			<motion.nav
				className="navbar navbar-expand-lg navbar-dark bg-dark p-3 navbarPrincipal fixed-top"
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="nombreWeb">
					<Link className="noSubrayadoLink" to="/">
						<img src={logofittitans} alt="Fit Titans Logo" className="logoFitTitans" />
					</Link>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<div className="botonesNavbar navbar-nav ms-auto">
						<motion.div className="botonNavbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
							<Link to={tipoUsuario ? "/listaclientes" : "/listaentrenadores"}>
								<button className="btn btn-Navbar">{tipoUsuario ? "Lista Usuarios" : "Lista Entrenadores"}</button>
							</Link>
						</motion.div>
						{store.seInicio ? (
							<>
								<motion.div className="botonNavbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
									<Link to="/miarea">
										<button className="btn btn-Navbar">Mi área</button>
									</Link>
								</motion.div>
								<motion.div className="botonNavbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
									<button className="btn btn-Navbar" onClick={cerrarSesion}>
										Cerrar sesión
									</button>
								</motion.div>
							</>
						) : (
							<>
								<motion.div className="botonNavbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
									<Link to="/contactanos">
										<button className="btn btn-Navbar">Contáctanos</button>
									</Link>
								</motion.div>
								<motion.div className="botonNavbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
									<button className="btn btn-Navbar" onClick={openModal}>
										Registrarse
									</button>
								</motion.div>
								<motion.div className="botonNavbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
									<Link to="/login">
										<button className="btn btn-Navbar">Iniciar Sesión</button>
									</Link>
								</motion.div>
							</>
						)}
					</div>
				</div>
			</motion.nav>
			{isModalOpen && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
					<Registro closeModal={closeModal} />
				</motion.div>
			)}
		</>
	);
};

