import React, { useContext, useEffect, useState } from 'react';
import { Contexto } from "../store/appContext";
import { Enlace, useNavigate } from "react-router-dom";
import "../../styles/FormulaCalorias.css";

export const FormulaCalorias = () => {
    const [datosFormulario, setDatosFormulario] = useState({
        genero: "",
        peso: "",
        altura: "",
        edad: ""
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

        const { genero, peso, altura, edad } = datosFormulario;
        let rmb;

        if (genero === "masculino") {
            rmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
        } else if (genero === "femenino") {
            rmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
        }

        setResultado(`Tu RMB es: ${rmb.toFixed(2)}`);
    };

    return (
        <div className="container">
            <h1>Calculadora RMB (Ritmo Metabólico Basal)</h1>
            <form onSubmit={enviarFormulario} className="formulario">
                <div className="grupo-formulario">
                    <label htmlFor="genero">Género:</label>
                    <select name="genero" id="genero" value={datosFormulario.genero} onChange={cambiarDatos} required>
                        <option value="">Selecciona tu género</option>
                        <option value="masculino">Hombre</option>
                        <option value="femenino">Mujer</option>
                    </select>
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="peso">Peso (kg):</label>
                    <input type="number" name="peso" id="peso" value={datosFormulario.peso} onChange={cambiarDatos} required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="altura">Altura (cm):</label>
                    <input type="number" name="altura" id="altura" value={datosFormulario.altura} onChange={cambiarDatos} required />
                </div>
                <div className="grupo-formulario">
                    <label htmlFor="edad">Edad (años):</label>
                    <input type="number" name="edad" id="edad" value={datosFormulario.edad} onChange={cambiarDatos} required />
                </div>
                <button type="submit">Calcular RMB</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};