import React, { useState } from "react";
import "../../styles/Rutinas.css";

//include images into your bundle
//create your first component
const RutinaBloque = ({ bloqueIndex, handleEliminarRutina }) => {
    const [inputValue, setInputValue] = useState("");
    const [rutinas, setRutinas] = useState([]);

    const handleAgregarRutina = () => {
        if (inputValue.length >= 3) {
            setRutinas([...rutinas, inputValue]);
            setInputValue("");
        }
    };

    return (
        <div className="container contenedorRutinasPrincipal">
            <div className="container contenedorTituloRutinas">
                RUTINAS
            </div>
            <div className="container contenedorRutina">
                <div className="subtituloRutina">
                    Bloque de Rutina {bloqueIndex + 1}
                </div>
                <div className="listaRutinas">
                    <ul>
                        <input
                            className="agregarRutina"
                            type="text"
                            onChange={(event) => setInputValue(event.target.value)}
                            value={inputValue}
                            onKeyUp={(event) => {
                                if (event.key === "Enter") {
                                    handleAgregarRutina();
                                }
                            }}
                            placeholder="Agrega Nuevo Ejercicio"
                        />
                        {rutinas.map((item, rutinaIndex) => (
                            <div className="Rutina" key={rutinaIndex}>
                                <div className="listaRutinas">
                                    <li>
                                        <span className="escritoRutina">{item} {""}</span>
                                        <i
                                            className="fas fa-trash-alt icono-borrar"
                                            onClick={() => handleEliminarRutina(bloqueIndex, rutinaIndex)}
                                        />
                                    </li>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="contenedorTasks">
                    {rutinas.length} Ejercicios
                </div>
            </div>
        </div>
    );
};

export const Rutinas = () => {
    const [bloques, setBloques] = useState([{}]);

    const handleAgregarBloque = () => {
        setBloques([...bloques, {}]);
    };

    const handleEliminarRutina = (bloqueIndex, rutinaIndex) => {
        setBloques(bloques.map((bloque, index) =>
            index === bloqueIndex
                ? {
                    ...bloque,
                    rutinas: bloque.rutinas.filter((_, i) => i !== rutinaIndex),
                }
                : bloque
        ));
    };

    return (
        <div className="container containerPrincipalRutinas">
            {bloques.map((_, bloqueIndex) => (
                <RutinaBloque
                    key={bloqueIndex}
                    bloqueIndex={bloqueIndex}
                    handleEliminarRutina={handleEliminarRutina}
                />
            ))}
            <div className="botonAgregarRutina">
                <button
                    type="button"
                    className="btn-masRutinas"
                    onClick={handleAgregarBloque}
                >
                    Agregar Bloque de Rutinas
                </button>
            </div>
        </div>
    );
};