import React, {useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

  
export const MiAreaCliente = () => (
    <div>
      <h1>Bienvenido, cliente</h1>
      <p>Contenido exclusivo para clientes.</p>
    </div>
  );
  
export const MiArea = () => {
    const [userType, setUserType] = useState('usuarioRegistrado'); // Estado inicial
    const navigate = useNavigate();
  
    useEffect(() => {
      // Simular una llamada a una API para obtener el tipo de usuario
      const fetchUserType = async () => {
        const response = await new Promise((resolve) => {
          setTimeout(() => resolve('usuarioRegistrado'), 1000); // Simula una respuesta de API
        });
        setUserType(response);
      };
  
      fetchUserType();
    }, []);
  
    return (
      <div>
        {userType === 'registered' && <MiAreaRegistrado />}
        {userType === 'client' && <MiAreaCliente />}
      </div>
    );
  };