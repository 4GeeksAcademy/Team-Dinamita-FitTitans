import React, {useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import {MiAreaCliente} from "../component/MiAreaCliente.jsx"
import {MiAreaEntrenador} from "../component/MiAreaEntrenador.jsx"
import { motion } from 'framer-motion';
 
export const MiArea = () => {
  const { store, actions } = useContext(Context);
  const [estado, setEstado] = useState(null)

  const navigate = useNavigate();

  useEffect (() =>{
		const verificar = localStorage.getItem("user_rol")
		if (verificar === "true"){
         setEstado(true)
      }else{
        return setEstado(false)
      }
	},[])

    
  const Return = (e) => {
    e.preventDefault();
    navigate("/")
  } 

    return (
  <>
  <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

      {store.seInicio ? (
      <div>
        {estado ? (<MiAreaEntrenador/>) : (<MiAreaCliente/>)}
      </div>) : (
        <div>
          <button onClick={(e) => Return(e)}> Error Go Home</button>
        </div>
      )}  

    </motion.div>
  </>     
    );
  };