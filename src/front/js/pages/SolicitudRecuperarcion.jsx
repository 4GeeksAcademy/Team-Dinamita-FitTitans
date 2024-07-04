import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/Navbar.css";
import "../../styles/IniciarSesion.css"
import { motion } from 'framer-motion';
import { Toaster, toast } from "sonner";

export const SolicitudRecuperacion = () => {
  const [email, setEmail] = useState("");
  const { store, actions } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await actions.RecuperarContraseña(email)
        if (response === true) {
            toast.success("Se ha enviado un correo electrónico con las instrucciones para recuperar tu contraseña.");
        } else {
            toast.error("Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.");
        }
    } catch (error) {
        toast.error("Hubo un error al procesar tu solicitud n2. Por favor, inténtalo de nuevo más tarde.");
    }
};


return (
    <>
    <Toaster position="top-center" richColors/>
    <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

        <form className="container InicioSesion" onSubmit={handleSubmit} id="inicio">
            <div className="my-3">
                <label className="form-label d-flex text-start text-light" id="email">
                    <i className="fas fa-envelope mx-2"></i>
                    Solicitud Recuperar Contraseña por Email
                </label>
                <input
                    type="email"
                    className="form-control"
                    minLength={3}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                />
            </div>
            <div className="botonNavbar container d-flex justify-content-center">
                <input
                    type="submit"
                    className="btn btn-Navbar mx-3 d-flex justify-content-center"
                    value={"Enviar"}
                />
            </div>
        </form>

        </motion.div>
    </>
);
};
