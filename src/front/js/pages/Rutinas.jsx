import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/Rutinas.css";

export const RutinaBloque = ({
    bloqueIndex,
    nombreBloque,
    setNombreBloque,
    agregarRutina,
    eliminarRutina,
    editarRutina,
    rutinas,
    isEntrenador,
}) => {
    const { store, actions } = useContext(Context);
    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [localNombreBloque, setLocalNombreBloque] = useState(nombreBloque); // Estado local para el nombre del bloque

    const handleAgregarRutina = () => {
        if (inputValue.trim() === "") {
            return; // No permitir rutinas vacías
        }

        agregarRutina(bloqueIndex, inputValue);
        setInputValue("");
    };

    const startEditing = (index, value) => {
        setIsEditing(true);
        setEditIndex(index);
        setEditValue(value);
    };

    const handleEditRutina = async () => {
        if (editValue.trim() === "") {
            return; // No permitir rutinas vacías
        }

        await editarRutina(bloqueIndex, editIndex, editValue); // Llama a la función para editar en el backend
        setIsEditing(false);
        setEditIndex(null);
        setEditValue("");
    };

    const handleCancelarEdicion = () => {
        setIsEditing(false);
        setEditIndex(null);
        setEditValue("");
    };

    const [isEditingNombreBloque, setIsEditingNombreBloque] = useState(false);
    const [nuevoNombreBloque, setNuevoNombreBloque] = useState(localNombreBloque); // Usar localNombreBloque aquí

    const handleEditNombreBloque = () => {
        if (nuevoNombreBloque.trim() === "") {
            return; // No permitir nombres vacíos
        }

        setNombreBloque(bloqueIndex, nuevoNombreBloque);
        setLocalNombreBloque(nuevoNombreBloque); // Actualizar el nombre local del bloque
        setIsEditingNombreBloque(false);
    };

    return (
        <div className="containerMayor">
            <div className="tituloRutina">
                {!isEditingNombreBloque ? (
                    <>
                        <h1>{localNombreBloque}</h1>
                        {isEntrenador && (
                            <button className="btn-editar-nombre" onClick={() => setIsEditingNombreBloque(true)}>
                                Editar Nombre
                            </button>
                        )}
                    </>
                ) : (
                    <div className="input-editar-nombre">
                        <input
                            type="text"
                            value={nuevoNombreBloque}
                            onChange={(e) => setNuevoNombreBloque(e.target.value)}
                            placeholder="Nuevo nombre"
                        />
                         <div className="botones-editar-nombre">
                            <button className="botonGuardar" onClick={handleEditNombreBloque}>
                                Guardar
                            </button>
                            <button className="botonCancelar" onClick={() => setIsEditingNombreBloque(false)}>
                                Cancelar
                            </button>
                         </div>
                       
                    </div>
                )}
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
                {rutinas.map((item) => (
                    <div className="Rutina" key={item.id}>
                        <li>
                            {isEditing && editIndex === item.id ? (
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    placeholder="Nuevo nombre"
                                />
                            ) : (
                                <span className="escritoRutina">{item.nombre}</span>
                            )}
                            {isEntrenador ? (
                                isEditing && editIndex === item.id ? (
                                    <>
                                        <div className="botones-editar-nombre">
                                            <button className="botonGuardar" onClick={handleEditRutina}>
                                                Guardar
                                            </button>
                                            <button className="botonCancelar" onClick={handleCancelarEdicion}>
                                                Cancelar
                                            </button>
                                        </div>
                                        
                                    </>
                                ) : (
                                    <>
                                        <i
                                            className="fas fa-trash-alt icono-borrar"
                                            onClick={() => eliminarRutina(bloqueIndex, item.id)}
                                        />
                                        <i
                                            className="fas fa-edit icono-editar"
                                            onClick={() => startEditing(item.id, item.nombre)}
                                        />
                                    </>
                                )
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
            <div className="contenedorTasksEjercicios">{rutinas.length} Ejercicios</div>
        </div>
    );
};

export const Rutinas = () => {
    const { store, actions } = useContext(Context);
    const [bloques, setBloques] = useState([]); // Estado para los bloques de rutinas
    const [isEntrenador, setIsEntrenador] = useState(false);
    const { cliente_id } = useParams();

    useEffect(() => {
        const verificar = localStorage.getItem("user_rol");
        setIsEntrenador(verificar === "true");

        if (cliente_id) {
            const storedBloques = localStorage.getItem('bloques');
            if (storedBloques) {
                setBloques(JSON.parse(storedBloques));
            } else {
                // Obtener las rutinas del cliente desde el backend al cargar el componente
                actions
                    .obtenerRutinasCliente(cliente_id)
                    .then((rutinas) => {
                        // Organizar las rutinas por bloques al iniciar la página
                        const bloquesFromServer = organizarRutinasPorBloques(rutinas);
                        setBloques(bloquesFromServer);

                        // Guardar en localStorage
                        localStorage.setItem('bloques', JSON.stringify(bloquesFromServer));
                    })
                    .catch((error) => console.error("Error al obtener las rutinas", error));
            }
        }
    }, [cliente_id, actions]);

    const organizarRutinasPorBloques = (rutinas) => {
        // Esta función organiza las rutinas en bloques basados en algún criterio (puedes definirlo según tus necesidades)
        // En este ejemplo, se agrupan todas las rutinas en un solo bloque
        return [{ nombre: "Bloque 1", rutinas: rutinas.map((rutina, index) => ({ id: index, nombre: rutina })) }];
    };

    const agregarRutina = async (bloqueIndex, nombreRutina) => {
        try {
            // Llamar al backend para agregar la rutina
            await actions.crearRutinaCliente(cliente_id, nombreRutina);

            // Obtener las rutinas actualizadas después de agregar
            const rutinasActualizadas = await actions.obtenerRutinasCliente(cliente_id);

            // Organizar las rutinas por bloques nuevamente
            const bloquesOrganizados = organizarRutinasPorBloques(rutinasActualizadas);
            setBloques(bloquesOrganizados);

            // Actualizar localStorage
            localStorage.setItem('bloques', JSON.stringify(bloquesOrganizados));
        } catch (error) {
            console.error("Error al agregar la rutina", error);
        }
    };

    const eliminarRutina = async (bloqueIndex, idRutina) => {
        try {
            // Llamar al backend para eliminar la rutina
            await actions.eliminarRutinaCliente(cliente_id, idRutina);

            // Obtener las rutinas actualizadas después de eliminar
            const rutinasActualizadas = await actions.obtenerRutinasCliente(cliente_id);

            // Organizar las rutinas por bloques nuevamente
            const bloquesOrganizados = organizarRutinasPorBloques(rutinasActualizadas);
            setBloques(bloquesOrganizados);

            // Actualizar localStorage
            localStorage.setItem('bloques', JSON.stringify(bloquesOrganizados));
        } catch (error) {
            console.error("Error al eliminar la rutina", error);
        }
    };

    const editarRutina = async (bloqueIndex, idRutina, nuevoNombre) => {
        try {
            // Llamar al backend para editar la rutina
            await actions.actualizarRutinaCliente(cliente_id, idRutina, nuevoNombre);

            // Obtener las rutinas actualizadas después de editar
            const rutinasActualizadas = await actions.obtenerRutinasCliente(cliente_id);

            // Organizar las rutinas por bloques nuevamente
            const bloquesOrganizados = organizarRutinasPorBloques(rutinasActualizadas);
            setBloques(bloquesOrganizados);

            // Actualizar localStorage
            localStorage.setItem('bloques', JSON.stringify(bloquesOrganizados));
        } catch (error) {
            console.error("Error al editar la rutina", error);
        }
    };

    const agregarBloque = () => {
        const nuevoBloque = { nombre: `Bloque ${bloques.length + 1}`, rutinas: [] };
        setBloques([...bloques, nuevoBloque]);

        // Actualizar localStorage
        localStorage.setItem('bloques', JSON.stringify([...bloques, nuevoBloque]));
    };

    const setNombreBloque = (bloqueIndex, nuevoNombre) => {
        const nuevosBloques = bloques.map((bloque, index) => {
            if (index === bloqueIndex) {
                return { ...bloque, nombre: nuevoNombre };
            }
            return bloque;
        });
        setBloques(nuevosBloques);

        // Guardar en localStorage
        localStorage.setItem('bloques', JSON.stringify(nuevosBloques));
    };

    return (
        <div className="containerPrincipalRutinas">
            {bloques.map((bloque, bloqueIndex) => (
                <RutinaBloque
                    key={bloqueIndex}
                    bloqueIndex={bloqueIndex}
                    nombreBloque={bloque.nombre}
                    setNombreBloque={setNombreBloque}
                    agregarRutina={agregarRutina}
                    eliminarRutina={eliminarRutina}
                    editarRutina={editarRutina}
                    rutinas={bloque.rutinas}
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
