import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import "/workspaces/Team-Dinamita-FitTitans/src/front/styles/Perfiles.css"
import "../../styles/PerfilEntrenadorPrivado.css";

export const PerfilEntrenadorPrivado = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editar, setEditar] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({});
  const [rol, setRol] = useState(null)
  const { id } = useParams();
  const { store, actions } = useContext(Context);

  const handleSubirImagen = async (userId, file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ronald_prueba");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djwkdsahw/image/upload", // cambiar image por video
        {
          method: "POST",
          body: data,
        }
      );

      const responseData = await response.json();
      const secureUrl = responseData.secure_url;
      console.log(secureUrl)
      const updatedUsuarios = usuarios.map((usuario) => {
        if (usuario.id === userId) {
          actions.EditarFotos(id, secureUrl)
          alert("foto actualizada correctamente")
          return { ...usuario, foto: responseData.secure_url };
        }
        return usuario;
      });

      setUsuarios(updatedUsuarios);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const manejarEditarUsuario = async (usuarioId) => {
    await actions.EditarUsuario(usuarioId, datosFormulario);
    setEditar(false);
    // Actualizar localmente los datos del usuario editado
    const usuarioActualizado = usuarios.map((usuario) => {
      if (usuario.id === usuarioId) {
        return { ...usuario, ...datosFormulario };
      }
      return usuario;
    });
    setUsuarios(usuarioActualizado);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  useEffect(() => {
    const fetchUsuarioUnico = async () => {
      await actions.GetEntrenadorUnico(id);
      const usuariofinal = store.usuarioUnico;
      console.log(store.usuarioUnico);
      console.log(usuariofinal);
      if (usuariofinal && Array.isArray(usuariofinal)) {
        setUsuarios(usuariofinal);
      } else {
        setUsuarios([usuariofinal]); // Si no es un array, lo envuelve en uno
      }
    };
    const tomarRol = localStorage.getItem("user_rol")
    if (tomarRol == "true") {
      setRol(true)
    } else { setRol(false) }
    fetchUsuarioUnico();
  }, [editar, usuarios.foto,]);

  console.log(usuarios);

  return (
    <>
      {rol ? (
        <div className="container contenedorPerfilPrivado">
          <div className="contenedorTituloPerfil">
            <div className="form-group TituloPerfil">PERFIL</div>
          </div>
          <ul className="contenedorListaUsuarios">
            {Array.isArray(usuarios) && usuarios.map((usuario) => (
              <li key={usuario.id} className="usuarioItem">
                <div className="card perfilCard">
                  <img src={usuario.foto} className="card-img-top" alt={`Imagen de ${usuario.nombre}`} />
                  <div className="card-body">
                    <h5 className="card-titlePrivado">{usuario.nombre}</h5>
                    <p className="card-text">Datos Personales</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Email: {usuario.email}</li>
                    <li className="list-group-item">Nombre: {usuario.nombre}</li>
                    <li className="list-group-item">Teléfono: {usuario.telefono}</li>
                    <li className="list-group-item">Edad: {usuario.edad}</li>
                    <li className="list-group-item">Género: {usuario.genero}</li>
                    <li className="list-group-item">Altura: {usuario.altura}</li>
                    <li className="list-group-item">Tipo De Entrenamiento: {usuario.tipo_entrenamiento}</li>
                  </ul>
                  <div className="card-body">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Default checkbox
                      </label>
                    </div>
                    <a href="#" className="card-link">Ir arriba</a>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSubirImagen(usuario.id, e.target.files[0])}
                />
                {editar ? (
                  <>
                    <input className="inputImagen"
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={manejarCambio}
                      defaultValue={usuario.email}
                    />
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      placeholder="Nombre"
                      onChange={manejarCambio}
                      defaultValue={usuario.nombre}
                    />
                    <input
                      type="text"
                      name="telefono"
                      className="form-control"
                      placeholder="Teléfono"
                      onChange={manejarCambio}
                      defaultValue={usuario.telefono}
                    />
                    <input
                      type="number"
                      name="edad"
                      className="form-control"
                      placeholder="Edad"
                      onChange={manejarCambio}
                      defaultValue={usuario.edad}
                    />
                    <select
                      name="genero"
                      className="form-select"
                      onChange={manejarCambio}
                      defaultValue={usuario.genero}
                    >
                      <option value="">Seleccionar</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <input
                      type="text"
                      name="altura"
                      className="form-control"
                      placeholder="Altura"
                      onChange={manejarCambio}
                      defaultValue={usuario.altura}
                    />
                    <input
                      type="text"
                      name="tipo_entrenamiento"
                      className="form-control"
                      placeholder="Tipo de entrenamiento"
                      onChange={manejarCambio}
                      defaultValue={usuario.tipo_entrenamiento}
                    />
                    <button className="subirEditar" onClick={() => manejarEditarUsuario(usuario.id)}>Guardar</button>
                  </>
                ) : (
                  <button className="subirEditar" onClick={() => setEditar(true)}>Editar</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1> ERROR </h1>
      )}
    </>


  );
};
