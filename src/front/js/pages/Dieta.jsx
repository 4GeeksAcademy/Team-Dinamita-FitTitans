import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Dieta = () => {
    const { actions, store } = useContext(Context); 
    const { asignacion_id } = useParams();
    const [dieta, setDieta] = useState(""); 
    const [mensaje, setMensaje] = useState(""); 

    useEffect(() => {
        const obtenerDieta = async () => {
            const resultado = await actions.obtenerDieta(asignacion_id); 
            if (resultado.success) {
                setDieta(resultado.dieta || ""); 
            } else {
                setMensaje(`Error: ${resultado.error}`);
            }
        };
        obtenerDieta();
    }, [asignacion_id, actions]); 

    
    const manejarCrearDieta = async () => {
        if (!dieta.trim()) {
            setMensaje("Por favor ingresa una dieta válida");
            return;
        }

        const resultado = await actions.crearDieta(asignacion_id, dieta); 
        if (resultado.success) {
            setDieta(dieta); 
            setMensaje("Dieta creada correctamente");
        } else {
            setMensaje(`Error: ${resultado.error}`);
        }
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        if (!dieta.trim()) {
            setMensaje("Por favor ingresa una dieta válida");
            return;
        }
        const resultado = await actions.actualizarDieta(asignacion_id, dieta); 
        if (resultado.success) {
            setMensaje("Dieta actualizada correctamente");
        } else {
            setMensaje(`Error: ${resultado.error}`);
        }
    };

    const manejarEliminar = async () => {
        const resultado = await actions.eliminarDieta(asignacion_id);
        if (resultado.success) {
            setDieta(""); 
            setMensaje("Dieta eliminada correctamente");
        } else {
            setMensaje(`Error: ${resultado.error}`);
        }
    };

    return (
        <div>
            <form onSubmit={manejarSubmit}>
                <textarea value={dieta} onChange={(e) => setDieta(e.target.value)} />
                <button type="submit">Guardar Dieta</button>
                <button type="button" onClick={manejarEliminar}>Eliminar Dieta</button>
            </form>
            <button onClick={manejarCrearDieta}>Crear Nueva Dieta</button>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};
