import React,{ useState, useEffect } from "react";
import { PerfilEntrenadorPrivado } from "../component/PerfilEntrenadorPrivado";
import { PerfilUsuarios } from "../component/PerfilUsuarios";


export const Perfiles = () => {
    const [estado, setEstado] = useState(null)



  useEffect (() =>{
		const verificar = localStorage.getItem("user_rol")
		if (verificar === "true"){
         setEstado(true)
      }else{
        return setEstado(false)
      }
		
	},[])

  
    return(
      <>
      {estado === null ? (
          <div>Loading...</div>
      ) : estado ? (
          <PerfilEntrenadorPrivado/>
      ) : (
          <PerfilUsuarios/>
      )}
  </>
);
};