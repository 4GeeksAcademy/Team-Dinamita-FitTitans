// usuarioFirebase, lo tendría que modificar por isAdmin, pq esas ventajas las tendrá el admin 
// mismo estilo que la navbar con ternario

import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../../../firebase/credenciales";
import "../../styles/Rutinas.css";

const auth = getAuth(firebaseApp);

const RutinaBloque = ({ bloqueIndex, agregarRutina, eliminarRutina, editarRutina, rutinas, usuarioFirebase }) => {
    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleAgregarRutina = () => {
        if (inputValue.length >= 5) {
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
        if (editValue.length >= 5) {
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
                {usuarioFirebase && (
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
                )}
                {rutinas.map((item, rutinaIndex) => (
                    <div className="Rutina" key={rutinaIndex}>
                        <li>
                            <span className="escritoRutina">{item} {""}</span>
                            {usuarioFirebase ? (
                                <>
                                    <i
                                        className="fas fa-trash-alt icono-borrar"
                                        onClick={() => eliminarRutina(bloqueIndex, rutinaIndex)}
                                    />
                                    <i
                                        className="fas fa-edit icono-editar"
                                        onClick={() => startEditing(rutinaIndex, item)}
                                    />
                                </>
                            ) : (
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        // Lógica para manejar el cambio del checkbox
                                    }}
                                />
                            )}
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
    const [usuarioFirebase, setIsAdmin] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (usuarioFirebase) => {
            if (usuarioFirebase) {
                setIsAdmin(usuarioFirebase.email === "emailDelAdmin@fhgh.com"); 
            } else {
                setIsAdmin(false);
            }
        });
    }, []);

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
                    usuarioFirebase={usuarioFirebase}
                />
            ))}
            {usuarioFirebase && (
                <div>
                    <button type="button" className="btn-masRutinas" onClick={agregarBloque}>
                        Agregar Bloque de Rutinas
                    </button>
                </div>
            )}
        </div>
    );
};
