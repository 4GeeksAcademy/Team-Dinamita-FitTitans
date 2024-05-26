import React, {useContext, useEffect, useState,}  from "react";
import { Context } from "../store/appContext";
import { Link,  } from "react-router-dom";

export const ListaUsuarios =()=>{

  const [contactos, setContactos] = useState([
    {
    nombre: "asd",
    numero: "asd",
    email: "asdasd@asdasd",
    imagen: "traerla desde cloudinary"
    },
    {
        nombre: "asd",
        numero: "asd",
        email: "asdasd@asdasd",
        imagen: "traerla desde cloudinary"
    }
]);
 

//to={`/Profile/${contact.id}`}
    return(
<>
        <div className="container mt-5 contactos">
        <ul className="list-group mb-5 ">
        {contactos.map((contact, index) => (
      <li key={index} className="list-group-item bg-dark text-light ">
        <div className="row align-items-center">
          <div className="col-3">
            <Link to={"/"}>
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="img-fluid rounded-circle"/>
            </Link>
          </div>
          <div className="col-6 overflow-hidden">
            <h5>{contact.nombre}</h5>
            <p>{contact.email}</p>
            <p>{contact.numero}</p>
          </div>
        </div>
      </li>        
    ))}
        </ul>
    </div>
</>
       
        
    )
}