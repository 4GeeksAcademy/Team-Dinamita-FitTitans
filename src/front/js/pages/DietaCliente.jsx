import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/DietaCliente.css";

export const DietaCliente = () => {
    const { actions } = useContext(Context);
    const { usuario_id } = useParams();
    const [comidas, setComidas] = useState([]);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const fetchDietaCliente = async () => {
            const resultado = await actions.obtenerDietaCliente(usuario_id);
            if (resultado.success) {
                setComidas(resultado.dieta || []);
            } else {
                setMensaje(`Error: ${resultado.error}`);
            }
        };
        fetchDietaCliente();
    }, [usuario_id, actions]);

    return (
        <div className="containerPrincipalDieta">
            <div className="contenedorTituloDietaPrivada">
                <div className="tituloDietaPrivada">
                    MI DIETA
                </div>
            </div>
            <div className="listaComidas">
                {mensaje && <p className="mensajeDieta">{mensaje}</p>}
                {comidas.length > 0 ? (
                    comidas.map((comida, index) => (
                        <div key={index} className="comidaItem">
                            <pre>{comida}</pre>
                        </div>
                    ))
                ) : (
                    <p>No hay comidas en tu dieta</p>
                )}
            </div>
        </div>
    );
};
