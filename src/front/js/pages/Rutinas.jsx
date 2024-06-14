import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/Rutinas.css";

export const RutinaBloque = ({ bloqueIndex, agregarRutina, eliminarRutina, editarRutina, rutinas, isEntrenador }) => {
    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleAgregarRutina = () => {
        if (inputValue.trim() === "") {
            return;  // No permitir rutinas vacías
        }

        agregarRutina(bloqueIndex, inputValue);
        setInputValue("");
    };

    const startEditing = (index, value) => {
        setIsEditing(true);
        setEditIndex(index);
        setEditValue(value);
    };

    const handleEditRutina = () => {
        if (editValue.trim() === "") {
            return;  // No permitir rutinas vacías
        }

        editarRutina(bloqueIndex, editIndex, editValue);
        setIsEditing(false);
        setEditIndex(null);
        setEditValue("");
    };

    const handleCancelarEdicion = () => {
        setIsEditing(false);
        setEditIndex(null);
        setEditValue("");
    };

    return (
        <div className="containerMayor">
            <div className="tituloRutina">
                <h1>BLOQUE DE RUTINAS {bloqueIndex + 1}</h1>
            </div>
            <ul>
                {isEntrenador && (
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
                            <span className="escritoRutina">{item}</span>
                            {isEntrenador ? (
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
                    <button className="botonCancelar" onClick={handleCancelarEdicion}>Cancelar</button>
                </div>
            )}
            <div className="contenedorTasksEjercicios">
                {rutinas.length} Ejercicios
            </div>
        </div>
    );
};

export const Rutinas = () => {
    const { store, actions } = useContext(Context);
    const [bloques, setBloques] = useState([[]]); // Inicializar con un solo bloque vacío
    const [isEntrenador, setIsEntrenador] = useState(false);
    const { cliente_id } = useParams();

    useEffect(() => {
        const verificar = localStorage.getItem("user_rol");
        setIsEntrenador(verificar === "true");

        if (cliente_id) {
            actions.obtenerRutinasCliente(cliente_id)
                .then(rutinas => {
                    const bloquesInicializados = rutinas.map(rutina => [rutina]);
                    setBloques(bloquesInicializados);
                })
                .catch(error => console.error("Error al obtener las rutinas", error));
        }
    }, [cliente_id, actions]);

    const agregarRutina = (bloqueIndex, rutina) => {
        const newBloques = [...bloques];
        newBloques[bloqueIndex] = [...newBloques[bloqueIndex], rutina];
        setBloques(newBloques);

        actions.crearRutinaCliente(cliente_id, rutina)
            .then(() => actions.obtenerRutinasCliente(cliente_id))
            .then(rutinas => {
                const updatedBloques = [...bloques];
                updatedBloques[bloqueIndex] = rutinas;
                setBloques(updatedBloques);
            })
            .catch(error => console.error("Error al agregar la rutina", error));
    };

    const eliminarRutina = (bloqueIndex, rutinaIndex) => {
        const newBloques = [...bloques];
        const newRutinas = newBloques[bloqueIndex].filter((_, index) => index !== rutinaIndex);
        newBloques[bloqueIndex] = newRutinas;
        setBloques(newBloques);

        actions.eliminarRutinaCliente(cliente_id, rutinaIndex)
            .then(() => actions.obtenerRutinasCliente(cliente_id))
            .then(rutinas => {
                const updatedBloques = [...bloques];
                updatedBloques[bloqueIndex] = rutinas;
                setBloques(updatedBloques);
            })
            .catch(error => console.error("Error al eliminar la rutina", error));
    };

    const editarRutina = (bloqueIndex, rutinaIndex, nuevaRutina) => {
        const newBloques = [...bloques];
        newBloques[bloqueIndex][rutinaIndex] = nuevaRutina;
        setBloques(newBloques);

        actions.actualizarRutinaCliente(cliente_id, rutinaIndex, nuevaRutina)
            .then(() => actions.obtenerRutinasCliente(cliente_id))
            .then(rutinas => {
                const updatedBloques = [...bloques];
                updatedBloques[bloqueIndex] = rutinas;
                setBloques(updatedBloques);
            })
            .catch(error => console.error("Error al editar la rutina", error));
    };

    const agregarBloque = () => {
        setBloques([...bloques, []]); // Agregar un nuevo bloque vacío
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
                    isEntrenador={isEntrenador}
                />
            ))}
            {isEntrenador && (
                <div>
                    <button type="button" className="btn-masRutinas" onClick={agregarBloque}>
                        Agregar Bloque de Rutinas
                    </button>
                </div>
            )}
        </div>
    );
};










// const auth = getAuth(firebaseApp);

// const RutinaBloque = ({ bloqueIndex, agregarRutina, eliminarRutina, editarRutina, rutinas, usuarioFirebase }) => {
//     const [inputValue, setInputValue] = useState("");
//     const [isEditing, setIsEditing] = useState(false);
//     const [editIndex, setEditIndex] = useState(null);
//     const [editValue, setEditValue] = useState("");

//     const handleAgregarRutina = () => {
//         if (inputValue.length >= 5) {
//             agregarRutina(bloqueIndex, inputValue);
//             setInputValue("");
//         }
//     };

//     const startEditing = (index, value) => {
//         setIsEditing(true);
//         setEditIndex(index);
//         setEditValue(value);
//     };

//     const handleEditRutina = () => {
//         if (editValue.length >= 5) {
//             editarRutina(bloqueIndex, editIndex, editValue);
//             setIsEditing(false);
//             setEditIndex(null);
//             setEditValue("");
//         }
//     };

//     return (
//         <div className="containerMayor">
//             <div className="tituloRutina">
//                 <h1>BLOQUE DE RUTINAS {bloqueIndex + 1}</h1>
//             </div>
//             <ul>
//                 {usuarioFirebase && (
//                     <input
//                         className="agregarRutina"
//                         type="text"
//                         onChange={(event) => setInputValue(event.target.value)}
//                         value={inputValue}
//                         onKeyUp={(event) => {
//                             if (event.key === "Enter" && !isEditing) {
//                                 handleAgregarRutina();
//                             }
//                         }}
//                         placeholder="Agrega Nuevo Ejercicio"
//                     />
//                 )}
//                 {rutinas.map((item, rutinaIndex) => (
//                     <div className="Rutina" key={rutinaIndex}>
//                         <li>
//                             <span className="escritoRutina">{item} {""}</span>
//                             {usuarioFirebase ? (
//                                 <>
//                                     <i
//                                         className="fas fa-trash-alt icono-borrar"
//                                         onClick={() => eliminarRutina(bloqueIndex, rutinaIndex)}
//                                     />
//                                     <i
//                                         className="fas fa-edit icono-editar"
//                                         onClick={() => startEditing(rutinaIndex, item)}
//                                     />
//                                 </>
//                             ) : (
//                                 <input
//                                     type="checkbox"
//                                     onChange={(e) => {
//                                         // Lógica para manejar el cambio del checkbox
//                                     }}
//                                 />
//                             )}
//                         </li>
//                     </div>
//                 ))}
//             </ul>
//             {isEditing && (
//                 <div>
//                     <input
//                         className="editarRutina"
//                         type="text"
//                         onChange={(event) => setEditValue(event.target.value)}
//                         value={editValue}
//                         onKeyUp={(event) => {
//                             if (event.key === "Enter") {
//                                 handleEditRutina();
//                             }
//                         }}
//                         placeholder="Edita el Ejercicio"
//                     />
//                     <button className="botonGuardar" onClick={handleEditRutina}>Guardar</button>
//                 </div>
//             )}
//             <div className="contenedorTasksEjercicios">
//                 {rutinas.length} Ejercicios
//             </div>
//         </div>
//     );
// };

// export const Rutinas = () => {
//     const [bloques, setBloques] = useState([[]]);
//     const [usuarioFirebase, setIsAdmin] = useState(false);

//     useEffect(() => {
//         onAuthStateChanged(auth, (usuarioFirebase) => {
//             if (usuarioFirebase) {
//                 setIsAdmin(usuarioFirebase.email === "emailDelAdmin@fhgh.com"); 
//             } else {
//                 setIsAdmin(false);
//             }
//         });
//     }, []);

//     const agregarRutina = (bloqueIndex, rutina) => {
//         const nuevosBloques = [...bloques];
//         nuevosBloques[bloqueIndex] = [...nuevosBloques[bloqueIndex], rutina];
//         setBloques(nuevosBloques);
//     };

//     const eliminarRutina = (bloqueIndex, rutinaIndex) => {
//         const nuevosBloques = [...bloques];
//         nuevosBloques[bloqueIndex] = nuevosBloques[bloqueIndex].filter((_, i) => i !== rutinaIndex);
//         setBloques(nuevosBloques);
//     };

//     const editarRutina = (bloqueIndex, rutinaIndex, nuevaRutina) => {
//         const nuevosBloques = [...bloques];
//         nuevosBloques[bloqueIndex][rutinaIndex] = nuevaRutina;
//         setBloques(nuevosBloques);
//     };

//     const agregarBloque = () => {
//         setBloques([...bloques, []]);
//     };

//     return (
//         <div className="containerPrincipalRutinas">
//             {bloques.map((rutinas, bloqueIndex) => (
//                 <RutinaBloque
//                     key={bloqueIndex}
//                     bloqueIndex={bloqueIndex}
//                     agregarRutina={agregarRutina}
//                     eliminarRutina={eliminarRutina}
//                     editarRutina={editarRutina}
//                     rutinas={rutinas}
//                     usuarioFirebase={usuarioFirebase}
//                 />
//             ))}
//             {usuarioFirebase && (
//                 <div>
//                     <button type="button" className="btn-masRutinas" onClick={agregarBloque}>
//                         Agregar Bloque de Rutinas
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };
