import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";

export const PerfilEntrenadorPrivado = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editar, setEditar] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({});
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
      console.log(responseData)
      const updatedUsuarios = usuarios.map((usuario) => {
        if (usuario.id === userId) {
          return { ...usuario, imagen: responseData.secure_url };
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

    fetchUsuarioUnico();
  }, [editar]);

  console.log(usuarios);

  return (
    <div className="container d-flex justify-content-center">
      <ul>
        {Array.isArray(usuarios) && usuarios.map((usuario) => (
          <li key={usuario.id}>
            <h1>{usuario.nombre}</h1>
            <div>
              <div className="card">
                <img src={usuario.imagen} className="card-img-top" alt={`Imagen de ${usuario.nombre}`} />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Email: {usuario.email}</li>
                  <li className="list-group-item">Nombre: {usuario.nombre}</li>
                  <li className="list-group-item">Telefono: {usuario.telefono}</li>
                  <li className="list-group-item">edad: {usuario.edad}</li>
                  <li className="list-group-item">Genero: {usuario.genero}</li>
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
                  <a href="#" className="card-link">Another link</a>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => manejarSubirImagen(usuario.id, e.target.files[0])}
              />
              {editar ? (
                <>
                  <input
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
                    placeholder="Telefono"
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
                  <button onClick={() => manejarEditarUsuario(usuario.id)}>Guardar</button>
                </>
              ) : (
                <button onClick={() => setEditar(true)}>Editar</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
