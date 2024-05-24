import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import { Registro } from "../pages/Registro";

export const Navbar = () => {
	const [test, setTest] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

  return (
    <>
      <nav className="navbar navbar-dark bg-dark p-3">
        <div className="nombreWeb">
          <Link className="noSubrayadoLink" to="/">
            <span className="logo">FIT TITANS</span>
          </Link>
        </div>
        {test ? (
          <div className="botonesNavbar">
            <div className="botonNavbar">
              <Link to="/">
                <button className="btn btn-Navbar">Perfil Entrenador</button>
              </Link>
            </div>
            <div className="botonNavbar">
              <button className="btn btn-Navbar" onClick={openModal}>
                Registrarse
              </button>
            </div>
            <div className="botonNavbar">
              <Link to="/">
                <button className="btn btn-Navbar">Iniciar Sesion</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="botonesNavbar">
            <div className="botonNavbar">
              <Link to="/">
                <button className="btn btn-Navbar">Perfil Entrenador</button>
              </Link>
            </div>
            <div className="botonNavbar">
              <Link to="/registro">
                <button className="btn btn-Navbar">Mi area</button>
              </Link>
            </div>
            <div className="botonNavbar">
              <Link to="/">
                <button className="btn btn-Navbar">Cerrar sesionnnnn</button>
              </Link>
            </div>
          </div>
        )}
      </nav>
      {isModalOpen && <Registro closeModal={closeModal} />}
    </>
  );
};
