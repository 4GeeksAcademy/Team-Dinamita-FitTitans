import React, { useContext, useEffect, useState, } from "react";
import { Context } from "../store/appContext";
import { Link, } from "react-router-dom";
import "../../styles/ListaEntrenadores.css";

export const ListaEntrenadores = () => {

  // useEffect (( )=>{
  // 	const requestOptions = {
  // 		method: "GET",
  // 		redirect: "follow"
  // 	  };

  // 	  fetch("https://playground.4geeks.com/todo/users/annams02", requestOptions)
  // 		.then(async (response) => {
  // 			const jsonResponse = await response.json();
  // 			setListaEntrenadores(jsonResponse.todos);
  // 		})
  // 		.catch((error) => console.error(error));
  // }, [])

  const [entrenadores, setEntrenadores] = useState([


    {
      nombre: "Nombre",
      numero: "Apellid",
      email: "asdasd@asdasd",
      edad: "",
      tipo entrenamiento: "",

      imagen: "traerla desde cloudinary"
    },
    {
      nombre: "asd",
      numero: "asd",
      email: "asdasd@asdasd",
      imagen: "traerla desde cloudinary"
    }
  ]);


  return (
    <>
      <div className="container mt-5 entrenadores">
        <ul className="list-group mb-5 ">
          {entrenadores.map((entrenador, index) => (
            <li key={index} className="list-group-item bg-dark text-light ">
              <div className="row align-items-center">
                <div className="col-3">
                  <Link to={"/"}>
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="img-fluid rounded-circle" />
                  </Link>
                </div>
                <div className="col-6 overflow-hidden">
                  <h5>{entrenador.nombre}</h5>
                  <p>{entrenador.email}</p>
                  <p>{entrenador.numero}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>


  )
}