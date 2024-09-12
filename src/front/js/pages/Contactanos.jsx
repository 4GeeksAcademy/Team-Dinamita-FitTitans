import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/Contactanos.css";
import { motion } from 'framer-motion';

export const Contactanos = () => {
    const { store, actions } = useContext(Context);
    const [contactoFormulario, setContactoFormulario] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChangeFormulario = (e) => {
        const { name, value } = e.target;
        setContactoFormulario({
            ...contactoFormulario,
            [name]: value
        });
    };

    return (
        <>
        <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>
            
        <div className="container contenedorContactanos">
            <div className="contenedorTituloContactanos">
                <div className="form-group TituloContactanos ">CONTÁCTANOS</div>
            </div>
            <form onSubmit={actions.handleSubmitContactanos} className="contact-form contenedorFormulario">
                <div className="form-group TituloFormulario">
                    <label className="form-label d-flex text-start textoFormulario">
                        <i className="fa fa-user bigicon mx-2"></i>
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactoFormulario.name}
                        onChange={handleChangeFormulario}
                        placeholder="Jose Guerrero"
                        minLength="3"
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group TituloFormulario">
                    <label className="form-label d-flex text-start textoFormulario">
                        <i className="fas fa-envelope mx-2"></i>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactoFormulario.email}
                        onChange={handleChangeFormulario}
                        placeholder="Nombre@ejemplo.com"
                        minLength="5"
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group TituloFormulario">
                    <label className="textoFormulario" htmlFor="message">Mensaje:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={contactoFormulario.message}
                        onChange={handleChangeFormulario}
                        required
                        placeholder="Escribe tu mensaje..."
                        className="form-control"
                        rows="8"
                    />
                </div>
                <div className="botonEnviarFormulario">
                    <button type="submit" className="btn btn-FormContactanos">Enviar</button>
                </div>
            </form>
        </div>
        
        </motion.div>
        </>
    );
};
