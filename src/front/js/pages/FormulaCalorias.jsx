import React, { useState } from 'react';
import "../../styles/FormulaCalorias.css";
import { motion } from 'framer-motion';
import {ChatGpt} from "../component/Chat/ChatGpt.jsx"
export const FormulaCalorias = () => {
    const [datosFormulario, setDatosFormulario] = useState({
        genero: "",
        peso: "",
        altura: "",
        edad: "",
        factorActividad: 1.2
    });

    const [resultado, setResultado] = useState("");

    const cambiarDatos = (e) => {
        const { name, value } = e.target;
        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        });
    };

    const enviarFormulario = (e) => {
        e.preventDefault();

        const { genero, peso, altura, edad, factorActividad } = datosFormulario;
        let rmb;

        if (genero === "masculino") {
            rmb = (66 + (13.7 * peso)) + ((5 * altura) - (6.8 * edad)) * factorActividad;
        } else if (genero === "femenino") {
            rmb = (655 + (9.6 * peso)) + ((1.8 * altura) - (4.7 * edad)) * factorActividad;
        }

        setResultado(`Tu RMB es: ${rmb.toFixed(2)}`);
    };

    return (
        <>
        <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

        <div className="container contenedorFormulaCalorias">
            <div className="contenedorTituloFormulaCalorias ">
                <div className="tituloFormulaCalorias">
                    Calculadora RMB (Ritmo Metabólico Basal)
                </div>
            </div>
            <div className="contenedorFormularioFormulaCalorias">
                <form onSubmit={enviarFormulario} className="formularioFormulaCalorias">
                    <div className="grupo-formulario grupo-formularioFormula">
                        <div className="GrupoFormularioCalorias">
                            <label htmlFor="genero">Género:</label>
                            <select className="inputFormulaCalorias" name="genero" id="genero" value={datosFormulario.genero} onChange={cambiarDatos} required>
                                <option value="">Selecciona tu género</option>
                                <option value="masculino">Hombre</option>
                                <option value="femenino">Mujer</option>
                            </select>
                        </div>
                    </div>
                    <div className="GrupoFormularioCalorias">
                        <label htmlFor="peso">Peso (kg):</label>
                        <input className="inputFormulaCalorias" type="number" name="peso" id="peso" value={datosFormulario.peso} onChange={cambiarDatos} required />
                    </div>
                    <div className="GrupoFormularioCalorias">
                        <label htmlFor="altura">Altura (cm):</label>
                        <input className="inputFormulaCalorias" type="number" name="altura" id="altura" value={datosFormulario.altura} onChange={cambiarDatos} required />
                    </div>
                    <div className="GrupoFormularioCalorias">
                        <label htmlFor="edad">Edad (años):</label>
                        <input className="inputFormulaCalorias" type="number" name="edad" id="edad" value={datosFormulario.edad} onChange={cambiarDatos} required />
                    </div>
                    <div className="GrupoFormularioCalorias">
                        <label htmlFor="factorActividad">Factor de actividad:</label>
                        <select className="inputFormulaCalorias" name="factorActividad" id="factorActividad" value={datosFormulario.factorActividad} onChange={cambiarDatos} required>
                            <option value="1.2">Poco o ningún ejercicio</option>
                            <option value="1.375">Ejercicio ligero (1-3 días a la semana)</option>
                            <option value="1.55">Ejercicio moderado (3-5 días a la semana)</option>
                            <option value="1.725">Ejercicio fuerte (6-7 días a la semana)</option>
                            <option value="1.9">Ejercicio muy fuerte (dos veces al día, entrenamientos muy duros)</option>
                        </select>
                    </div>
                    <div className="contenedorbotonEnviarFormularioCalcularCalorias">
                        <button className="botonEnviarFormularioCalcularCalorias" type="submit">Calcular RMB</button>
                    </div>
                </form>
                {resultado && <div className="resultado">{resultado}</div>}
            </div>
        </div>
        <ChatGpt />
        
        </motion.div>
        </>
    );
};