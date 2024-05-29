import React, { useState } from "react";
import "../../styles/Rutinas.css";

//include images into your bundle
//create your first component


const RutinaBloque = ({ bloqueIndex, agregarRutina, eliminarRutina, editarRutina, rutinas }) => {
    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleAgregarRutina = () => {
        if (inputValue.length >= 3) {
            agregarRutina(bloqueIndex, inputValue);
            setInputValue("");
        }
    };

    const startEditing = (index, value) => {
        setIsEditing(true);
        setEditIndex(index);
        setEditValue(value);
    };

    const handleEditRutina = () => {
        if (editValue.length >= 3) {
            editarRutina(bloqueIndex, editIndex, editValue);
            setIsEditing(false);
            setEditIndex(null);
            setEditValue("");
        }
    };

    return (
        <div className="containerMayor">
            <div className="tituloRutina">
                <h1>BLOQUE DE RUTINAS {bloqueIndex + 1}</h1>
            </div>
            <ul>
                <input
                    className="agregarRutina"
                    type="text"
                    onChange={(event) => setInputValue(event.target.value)}
                    value={inputValue}
                    onKeyUp={(event) => {
                        if (event.key === "Enter" && !isEditing) {
                            handleAgregarRutina();
                        }
                    }}
                    placeholder="Agrega Nuevo Ejercicio"
                />
                {rutinas.map((item, rutinaIndex) => (
                    <div className="Rutina" key={rutinaIndex}>
                        <li>
                            <span className="escritoRutina">{item} {""}</span>
                            <i
                                className="fas fa-trash-alt icono-borrar"
                                onClick={() => eliminarRutina(bloqueIndex, rutinaIndex)}
                            />
                            <i
                                className="fas fa-edit icono-editar"
                                onClick={() => startEditing(rutinaIndex, item)}
                            />
                        </li>
                    </div>
                ))}
            </ul>
            {isEditing && (
                <div>
                    <input
                        className="editarRutina"
                        type="text"
                        onChange={(event) => setEditValue(event.target.value)}
                        value={editValue}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                handleEditRutina();
                            }
                        }}
                        placeholder="Edita el Ejercicio"
                    />
                    <button className="botonGuardar" onClick={handleEditRutina}>Guardar</button>
                </div>
            )}
            <div className="contenedorTasksEjercicios">
                {rutinas.length} Ejercicios
            </div>
        </div>
    );
};

export const Rutinas = () => {
    const [bloques, setBloques] = useState([[]]);

    const agregarRutina = (bloqueIndex, rutina) => {
        const nuevosBloques = [...bloques];
        nuevosBloques[bloqueIndex] = [...nuevosBloques[bloqueIndex], rutina];
        setBloques(nuevosBloques);
    };

    const eliminarRutina = (bloqueIndex, rutinaIndex) => {
        const nuevosBloques = [...bloques];
        nuevosBloques[bloqueIndex] = nuevosBloques[bloqueIndex].filter((_, i) => i !== rutinaIndex);
        setBloques(nuevosBloques);
    };

    const editarRutina = (bloqueIndex, rutinaIndex, nuevaRutina) => {
        const nuevosBloques = [...bloques];
        nuevosBloques[bloqueIndex][rutinaIndex] = nuevaRutina;
        setBloques(nuevosBloques);
    };

    const agregarBloque = () => {
        setBloques([...bloques, []]);
    };

    return (
        <div className="containerPrincipalRutinas">
            {bloques.map((rutinas, bloqueIndex) => (
                <RutinaBloque
                    key={bloqueIndex}
                    bloqueIndex={bloqueIndex}
                    agregarRutina={agregarRutina}
                    eliminarRutina={eliminarRutina}
                    editarRutina={editarRutina}
                    rutinas={rutinas}
                />
            ))}
            <div>
                <button type="button" className="btn-masRutinas" onClick={agregarBloque}>
                    Agregar Bloque de Rutinas
                </button>
            </div>
        </div>
    );
};
