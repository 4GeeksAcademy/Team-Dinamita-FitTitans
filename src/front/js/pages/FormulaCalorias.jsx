import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/FormulaCalorias.css";


export const FormulaCalorias = () => {
    const [formData, setFormData] = useState({
        Genero: "",
        Peso: "",
        Altura: "",
        Edad: ""
    });

    const [result, setResult] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { genero, weight, height, age } = formData;
        let rmb;

        if (genero === "male") {
            rmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else if (gender === "female") {
            rmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        setResult(`Tu RMB es: ${rmb.toFixed(2)}`);
    };

    return (
        <div className="container">
            <h1>Calculadora RMB</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="gender">Género:</label>
                    <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Selecciona tu género</option>
                        <option value="male">Hombre</option>
                        <option value="female">Mujer</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Peso (kg):</label>
                    <input type="number" name="weight" id="weight" value={formData.weight} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="height">Altura (cm):</label>
                    <input type="number" name="height" id="height" value={formData.height} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Edad (años):</label>
                    <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} required />
                </div>
                <button type="submit">Calcular RMB</button>
            </form>
            {result && <div className="result">{result}</div>}
        </div>
    )
};