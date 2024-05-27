import React, { useState } from "react";

//include images into your bundle
//create your first component
export const Rutinas = () => {
    const [inputValue, setInputValue] = useState("");
    const [misRutinas, setMisRutinas] = useState([]);
    
    return (
        <div className="containerPrincipal">
            <div className="container">
                <div className="titulo">
                    <h1>Lunes</h1>
                </div>
                <ul>

                    <input className="agregarRutina" type="text"
                        onChange={(event) => setInputValue(event.target.value)}
                        value={inputValue}
                        onKeyUp={(event) => {
                            if (event.key === "Enter" && inputValue.length >= 3) {
                                setMisRutinas([...misRutinas, inputValue]);
                                setInputValue("");
                            }
                        }}
                        placeholder=" Agrega Nuevo Ejercicio">

                    </input>

                    {misRutinas.map((item, index) => (
                        <div className="Rutina">
                            <li>
                                <span className="escritoRutina">{item} {""}</span>

                                <i
                                    className="fas fa-trash-alt icono-borrar"
                                    onClick={() =>
                                        setMisRutinas(
                                            misRutinas.filter(
                                                (rutina, currentIndex) =>
                                                    index != currentIndex
                                            )
                                        )
                                    }
                                >
                                </i>

                            </li>
                        </div>
                    ))}
                </ul>
                <div className="contenedorTasks">
                    {misRutinas.length} Ejercicios
                </div>
                <div className="contenedorTasks2">
                </div>
                <div className="contenedorTasks1">
                </div>
            </div>

{/* //////////////BOTON: CREAR OTRA TABLA DE EJERCICIO: */}
            <div className="container">
                <div className="titulo">
                    <h1>Martes</h1>
                </div>
                <ul>

                    <input className="agregarRutina" type="text"
                        onChange={(event) => setInputValue(event.target.value)}
                        value={inputValue}
                        onKeyUp={(event) => {
                            if (event.key === "Enter" && inputValue.length >= 3) {
                                setMisRutinas([...misRutinas, inputValue]);
                                setInputValue("");
                            }
                        }}
                        placeholder=" Agrega Nuevo Ejercicio">

                    </input>

                    {misRutinas.map((item, index) => (
                        <div className="Rutina">
                            <li>
                                <span className="escritoRutina">{item} {""}</span>

                                <i
                                    className="fas fa-trash-alt icono-borrar"
                                    onClick={() =>
                                        setMisRutinas(
                                            misRutinas.filter(
                                                (rutina, currentIndex) =>
                                                    index != currentIndex
                                            )
                                        )
                                    }
                                >
                                </i>

                            </li>
                        </div>
                    ))}
                </ul>
                <div className="contenedorTasks">
                    {misRutinas.length} Ejercicios
                </div>
                <div className="contenedorTasks2">
                </div>
                <div className="contenedorTasks1">
                </div>
            </div>
        </div>
    );
};







