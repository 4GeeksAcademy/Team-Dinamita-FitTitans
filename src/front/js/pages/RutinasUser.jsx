// DESDE ESTE SERIA EL user. PUEDE darle al checkbox

import React, { useState } from "react";
import "../../styles/Rutinas.css";

const RutinaBloque = ({ bloqueIndex, rutinas, actualizarEstadoRutina }) => {
    return (
        <div className="containerMayor">
            <div className="tituloRutina">
                <h1>BLOQUE DE RUTINAS {bloqueIndex + 1}</h1>
            </div>
            <ul>
                {rutinas.map((item, rutinaIndex) => (
                    <div className="Rutina" key={rutinaIndex}>
                        <li>
                            <input
                                type="checkbox"
                                checked={item.hecho}
                                onChange={() => actualizarEstadoRutina(bloqueIndex, rutinaIndex)}
                            />
                            <span className="escritoRutina">{item.texto}</span>
                        </li>
                    </div>
                ))}
            </ul>
            <div className="contenedorTasksEjercicios">
                {rutinas.length} Ejercicios
            </div>
        </div>
    );
};

export const RutinasUser = () => {
    const [bloques, setBloques] = useState([
        [
            { texto: " ", hecho: false },
            { texto: "Ejercicio 2", hecho: false },
        ],
        [
            { texto: "Ejercicio 3", hecho: false },
            { texto: "Ejercicio 4", hecho: false },
        ],
    ]);
// aqui irá los GET 
    const actualizarEstadoRutina = (bloqueIndex, rutinaIndex) => {
        const nuevosBloques = [...bloques];
        nuevosBloques[bloqueIndex][rutinaIndex].hecho = !nuevosBloques[bloqueIndex][rutinaIndex].hecho;
        setBloques(nuevosBloques);
    };

    return (
        <div className="containerPrincipalRutinas">
            {bloques.map((rutinas, bloqueIndex) => (
                <RutinaBloque
                    key={bloqueIndex}
                    bloqueIndex={bloqueIndex}
                    rutinas={rutinas}
                    actualizarEstadoRutina={actualizarEstadoRutina}
                />
            ))}
        </div>
    );
};
