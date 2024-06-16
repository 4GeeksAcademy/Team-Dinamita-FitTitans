import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import "../../styles/ListaDeClientes.css";

export const ListaDeClientes = ({ entrenadorId }) => {
  const { store, actions } = useContext(Context);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    actions.obtenerListaClientes(1)
      .then(data => {
        setClientes(data);  // Actualiza el estado con los datos de los entrenadores
        console.log(data)
      })
      .catch(error => {
        console.error("Error al obtener la lista de clientes", error);
      });
  }, [entrenadorId]);


  return (
    <div className="container contenedorClientes">
      <div className="contenedorTituloClientes">
        <div className="form-group TituloClientes">LISTA DE CLIENTES</div>
      </div>
      <div className="contenedorListaClientes">
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.id} className="clienteItem">
              <Link to={`/clientes/${cliente.id}`} className="clienteLink">
                {cliente.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

//   return (
//     <div>
//       <h2>Lista de Clientes</h2>
//       <ul>
//         {clientes.map(cliente => (
//           <li key={cliente.id}>
//             <Link to={`/clientes/${cliente.id}`}>
//               {cliente.nombre}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


