// va con ternario, pq si estas como admin se puede editar y borrar, si eres user solo puedes checbox

import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../../../firebase/credenciales";
import "../../styles/Dieta.css";

const auth = getAuth(firebaseApp);

const DietaBloque = ({ bloqueIndex, agregarDieta, eliminarDieta, editarDieta, dietas, usuarioFirebase }) => {
    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleAgregarDieta = () => {
        if (inputValue.length >= 3) {
            agregarDieta(bloqueIndex, inputValue);
            setInputValue("");
        }
    };

    const startEditing = (index, value) => {
        setIsEditing(true);
        setEditIndex(index);
        setEditValue(value);
    };

    const handleEditDieta = () => {
        if (editValue.length >= 3) {
            editarDieta(bloqueIndex, editIndex, editValue);
            setIsEditing(false);
            setEditIndex(null);
            setEditValue("");
        }
    };

    return (
        <div className="containerMayor1">
            <div className="tituloDieta">
                <h1>TABLA DE ALIMENTACIÓN <i className="fa-solid fa-leaf"></i> {bloqueIndex + 1}</h1>
            </div>
            <ul>
                {usuarioFirebase && (
                    <input
                        className="agregarDieta"
                        type="text"
                        onChange={(event) => setInputValue(event.target.value)}
                        value={inputValue}
                        onKeyUp={(event) => {
                            if (event.key === "Enter" && !isEditing) {
                                handleAgregarDieta();
                            }
                        }}
                        placeholder="Agrega Nuevo Plato"
                    />
                )}
                {dietas.map((item, dietaIndex) => (
                    <div className="Dieta" key={dietaIndex}>
                        <li>
                            <span className="escritoDieta">{item} {""}</span>
                            {usuarioFirebase ? (
                                <>
                                    <i
                                        className="fas fa-trash-alt icono-borrar"
                                        onClick={() => eliminarDieta(bloqueIndex, dietaIndex)}
                                    />
                                    <i
                                        className="fas fa-edit icono-editar"
                                        onClick={() => startEditing(dietaIndex, item)}
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
                        className="editarDieta"
                        type="text"
                        onChange={(event) => setEditValue(event.target.value)}
                        value={editValue}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                handleEditDieta();
                            }
                        }}
                        placeholder="Edita la Dieta  "
                    />
                    <button className="botonGuardar" onClick={handleEditDieta}>Guardar</button>
                </div>
            )}
            <div className="contenedorTasksComidas">
                {dietas.length} Platos
            </div>
        </div>
    );
};

export const Dieta = () => {
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

    const agregarDieta = (bloqueIndex, dieta) => {
        const nuevosBloques = [...bloques];
        nuevosBloques[bloqueIndex] = [...nuevosBloques[bloqueIndex], dieta];
        setBloques(nuevosBloques);
    };

    const eliminarDieta = (bloqueIndex, dietaIndex) => {
        const nuevosBloques = [...bloques];
        nuevosBloques[bloqueIndex] = nuevosBloques[bloqueIndex].filter((_, i) => i !== dietaIndex);
        setBloques(nuevosBloques);
    };

    const editarDieta = (bloqueIndex, dietaIndex, nuevaDieta) => {
        const nuevosBloques = [...bloques];
        nuevosBloques[bloqueIndex][dietaIndex] = nuevaDieta;
        setBloques(nuevosBloques);
    };

    const agregarBloque = () => {
        setBloques([...bloques, []]);
    };

    return (
        <div className="containerPrincipalDietas">
            {bloques.map((dietas, bloqueIndex) => (
                <DietaBloque
                    key={bloqueIndex}
                    bloqueIndex={bloqueIndex}
                    agregarDieta={agregarDieta}
                    eliminarDieta={eliminarDieta}
                    editarDieta={editarDieta}
                    dietas={dietas}
                    usuarioFirebase={usuarioFirebase}
                />
            ))}
            {usuarioFirebase && (
                <div>
                    <button type="button" className="btn-masDietas" onClick={agregarBloque}>
                        Agregar Tabla de Alimentación
                    </button>
                </div>
            )}
        </div>
    );
};
