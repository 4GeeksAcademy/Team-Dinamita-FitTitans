import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

export const RecuperarContraseña = () => {
    const [verificarContraseña, setVerificarContraseña] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const { user_uuid } = useParams(); 
    const navigate = useNavigate(); 
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarContraseña(password.primera, verificarContraseña.segunda)) {
            alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        

        }
        try {

            const response = await actions.ModificarContraseña(password, user_uuid)
            if(response){
                alert("Contraseña Modificada")
                navigate("/login")
            }else
                alert("error chavista")
        } catch (error) {

            alert("Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.");
        }
    };  
    // Función para validar la coincidencia de contraseñas
    const validarContraseña = (password, password2) => {
        return password === password2;
    };

    const handleCheck = () => {
        setMostrarContraseña(!mostrarContraseña);
    };
    
    return (
        <>
        <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

            <form className="container InicioSesion" onSubmit={handleSubmit} id="inicio">
                <div className="my-3">
                    <label className="form-label d-flex text-start text-light" id="email">
                        Contraseña
                    </label>
                    <input
                        type={mostrarContraseña ? "text" : "password"}
                        className="form-control"
                        minLength={3}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******************"
                    />
                </div>
                <div className="my-3">
                    <label className="form-label d-flex text-start text-light" id="contraseña">
                        Confirme contraseña
                    </label>
                    <input
                        type={mostrarContraseña ? "text" : "password"}
                        className="form-control"
                        minLength={3}
                        required
                        placeholder="******************"
                        onChange={(e) => setVerificarContraseña(e.target.value)}
                    />
                </div>
                <div className="botonNavbar container d-flex justify-content-center">
                    <input
                        type="submit"
                        value={"Cambiar Contraseña"}
                        className="btn btn-Navbar mx-3 "
                    />
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                        onChange={handleCheck}
                    />
                    <label className="form-check-label text-light" htmlFor="flexCheckChecked">
                        Mostrar contraseñas
                    </label>
                </div>
            </form>

        </motion.div>
        </>
    );
};
