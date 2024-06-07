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
      apellido: "Apellido",
      email: "asdasd@asdasd",
      imagen: "traerla desde cloudinary",
      edad: "23",
      genero: "xx",
      tipoEntrenamiento: "fusufd",
      informacion: "",
    },
    {
      nombre: "Nombre",
      apellido: "Apellido",
      email: "asdasd@asdasd",
      imagen: "traerla desde cloudinary",
      edad: "23",
      genero: "xx",
      tipoEntrenamiento: "fusufd",
      informacion: "",
    },
  ]);


  return (
    <>
      <div className="container mt-5 containerEntrenadores">
        <ul className="list-group mb-5 ">
          {entrenadores.map((entrenador, index) => (
            <li key={index} className="list-group-item bg-dark text-light ">
              <div className="row align-items-center">
                <div className="fotoContainer col-4">
                  <Link to={"/"}>
                    <img src="https://img.freepik.com/foto-gratis/hombre-sorprendido-mirando-camara_23-2147799035.jpg?t=st=1717442553~exp=1717446153~hmac=648b6fb31775d1427c320760804a18fe780bef37999454dced282f2f5d4296c5&w=740" alt="User" className="img-fluid rounded-circle" />
                  </Link>
                </div>
                <div className="col-8 overflow-hidden">
                  <p className="Nombre">{entrenador.nombre}</p>
                  <p className="Apellido">{entrenador.apellido}</p>
                  <p>{entrenador.email}</p>
                  <p>{entrenador.edad}</p>
                  <p>{entrenador.genero}</p>
                  <p>{entrenador.tipoEntrenamiento}</p>

                  <div className="btnConocememas">
                    <Link to="/perfilentrenador">
                      {/* tendré que poner ruta /user cuando tengamos backend */}
                      <button className="btnConoceme">Conóceme más</button>
                    </Link>
                  </div>




                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>


  )
}