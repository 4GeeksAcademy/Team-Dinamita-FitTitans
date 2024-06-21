import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/RutinaCliente.css'; 

export const RutinaCliente = () => {
    const { actions } = useContext(Context);
    const { usuario_id } = useParams();
    const [rutinas, setRutinas] = useState([]);
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        const fetchRutinaCliente = async () => {
            const resultado = await actions.obtenerRutina(usuario_id);
            if (resultado.success) {
                setRutinas(resultado.rutina || []);
            } else {
                setMensaje(`Error: ${resultado.error}`);
            }
        };
        fetchRutinaCliente();
    }, [usuario_id, actions]);

    return (
        <div className="containerPrincipalRutina">
            <div className="contenedorTituloRutinaPrivada">
                <div className="tituloRutinaPrivada">
                    MI RUTINA
                </div>
            </div>
            <div className="listaRutinas">
                {mensaje && <p className="mensajeRutina">{mensaje}</p>}
                {rutinas.length > 0 ? (
                    rutinas.map((rutina, index) => (
                        <div key={index} className="rutinaItem">
                            <pre>{rutina}</pre>
                        </div>
                    ))
                ) : (
                    <p>No hay rutinas en tu plan</p>
                )}
            </div>
        </div>
    );
};
