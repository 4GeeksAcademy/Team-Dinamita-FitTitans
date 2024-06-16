import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/Dieta.css';

export const Rutinas = () => {
    const { actions } = useContext(Context);
    const { cliente_id, usuario_id } = useParams();
    const [comidas, setComidas] = useState([]);
    const [nuevaComida, setNuevaComida] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editComida, setEditComida] = useState("");

    useEffect(() => {
        const fetchRutina = async () => {
            const resultado = await actions.obtenerRutina(cliente_id);
            if (resultado.success) {
                setComidas(resultado.rutina || []);
            } else {
                setMensaje(`Error: ${resultado.error}`);
            }
        };
        fetchRutina();
    }, [cliente_id, actions]);

    const manejarAgregarRutina = () => {
        if (nuevaComida.trim()) {
            const nuevasComidas = [nuevaComida, ...comidas];
            setComidas(nuevasComidas);
            setNuevaComida("");
        } else {
            setMensaje("Por favor ingresa una rutina válida");
        }
    };

    const manejarGuardarRutina = async () => {
        const resultado = await actions.actualizarRutina(cliente_id, comidas);
        if (resultado.success) {
            setMensaje("Rutina guardada correctamente");
        } else {
            setMensaje(`Error: ${resultado.error}`);
        }
    };

    const manejarEliminarRutina = (index) => {
        const nuevasComidas = comidas.filter((_, i) => i !== index);
        setComidas(nuevasComidas);
    };

    const manejarEditarRutina = (index) => {
        setEditIndex(index);
        setEditComida(comidas[index]);
    };

    const manejarGuardarEdicion = () => {
        const nuevasComidas = comidas.map((comida, index) =>
            index === editIndex ? editComida : comida
        );
        setComidas(nuevasComidas);
        setEditIndex(null);
        setEditComida("");
    };

    const manejarCancelarEdicion = () => {
        setEditIndex(null);
        setEditComida("");
    };

    return (
        <div className="containerPrincipalDieta">
            <div className="contenedorTituloDietaPrivada">
                <div className="tituloDietaPrivada">
                    RUTINA
                </div>
            </div>
            <div className="formularioDieta">
                <textarea
                    value={nuevaComida}
                    onChange={(e) => setNuevaComida(e.target.value)}
                    placeholder="Ingrese una rutina"
                    rows={4}
                    cols={50}
                />
                <button onClick={manejarAgregarRutina}>Agregar Rutina</button>
                {mensaje && <p className="mensajeDieta">{mensaje}</p>}
                <div className="listaComidas">
                    {comidas.map((comida, index) => (
                        <div key={index} className="comidaItem">
                            {editIndex === index ? (
                                <div>
                                    <textarea
                                        value={editComida}
                                        onChange={(e) => setEditComida(e.target.value)}
                                        rows={4}
                                        cols={50}
                                    />
                                    <button onClick={manejarGuardarEdicion}>Guardar</button>
                                    <button onClick={manejarCancelarEdicion}>Cancelar</button>
                                </div>
                            ) : (
                                <div>
                                    <pre>{comida}</pre>
                                    <div className="botonesEditarEliminar">
                                        <button onClick={() => manejarEditarRutina(index)}>Editar</button>
                                        <button onClick={() => manejarEliminarRutina(index)}>Eliminar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={manejarGuardarRutina}>Guardar Rutina</button>
            </div>

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
