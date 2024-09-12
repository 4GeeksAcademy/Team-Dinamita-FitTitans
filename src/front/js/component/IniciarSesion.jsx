import React, { useState, useContext } from "react";
import "../../styles/IniciarSesion.css"
import { useNavigate, Link } from "react-router-dom";
import { Registro } from "./Registro";
import { Context } from "../store/appContext";
import { motion } from 'framer-motion';
import { Toaster, toast } from "sonner";

export const IniciarSesion = () => {
  const [usuarios, setUsuarios] = useState({
    email: "",
    password: "",
  });

  const [sesion, setSession] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificar = await actions.HandleInicioSesion(usuarios);
    
    if (verificar === true) {
      navigate("/miarea")
    } else {
      toast.error(`Error en Email o Contraseña`)
    }
  };

  return (
    <>
    <Toaster  position="top-center" richColors />
    <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

      {store.seInicio ? (<h1 className="text-light">error</h1>)
        : (
          <>
            <form className="container InicioSesion" onSubmit={handleSubmit} id="inicio">
              <div className="my-3">
                <label className="form-label d-flex text-start text-light" id="email">
                  <i className="fas fa-envelope mx-2" ></i>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  minLength={3}
                  required={true}
                  onChange={(e) => setUsuarios({ ...usuarios, email: e.target.value })}
                  placeholder="name@example.com"
                />
              </div>
              <div className="my-3">
                <label className="form-label d-flex text-start text-light" id="contraseña">
                  <i className="fas fa-key mx-2" ></i>
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  minLength={3}
                  required={true}
                  placeholder="******************"
                  onChange={(e) => setUsuarios({ ...usuarios, password: e.target.value })}
                />
              </div>
              <div className="botonNavbar container d-flex justify-content-center">
                <input
                  type="submit"
                  value={"Iniciar Sesion"}
                  className="btn-sm btn-Navbar mx-3 "
                />
                <Link to="/solicitud">
                  <input
                    type="submit"
                    value={"Recuperar Contraseña"}
                    className="btn-sm btn-Navbar mx-3 "
                  />
                </Link>
              </div>

            </form>
            {isModalOpen && <Registro closeModal={closeModal} />}
          </>)}
          
    </motion.div>
    </>
  )
}