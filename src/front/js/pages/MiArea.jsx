import React, {useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import {MiAreaCliente} from "/workspaces/Team-Dinamita-FitTitans/src/front/js/component/MiAreaCliente.jsx"
import {MiAreaEntrenador} from "/workspaces/Team-Dinamita-FitTitans/src/front/js/component/MiAreaEntrenador.jsx"

  
export const MiArea = () => {
  const { store, actions } = useContext(Context);
  const [estado, setEstado] = useState(null)

  const navigate = useNavigate();

  useEffect (() =>{
		const verificar = store.rol
		if (verificar == true){
         setEstado(true)
      }else{
        return setEstado(false)
      }
		
	},[])


    console.log(estado)
    
  const Return = (e) => {
    e.preventDefault();
    navigate("/")
  } 

    return (
  <>
      {store.seInicio ? (
      <div>
        {estado ? (<MiAreaEntrenador/>) : (<MiAreaCliente/>)}
      </div>) : (
        <div>
          <button onClick={(e) => Return(e)}> Error Go Home</button>
        </div>
      )}
      
  </>
      
    );
  };