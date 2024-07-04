import React,{ useState, useEffect } from "react";
import { PerfilEntrenadorPrivado } from "../component/PerfilEntrenadorPrivado";
import { PerfilUsuarios } from "../component/PerfilUsuarios";
import "../../styles/Perfiles.css"
import { motion } from 'framer-motion';


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
      <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

      {estado === null ? (
          <div>Loading...</div>
      ) : estado ? (
          <PerfilEntrenadorPrivado/>
      ) : (
          <PerfilUsuarios/>
      )}

    </motion.div>
  </>
);
};