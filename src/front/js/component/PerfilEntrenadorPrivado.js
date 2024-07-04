import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import UploadWidgetFoto from './UploadWidgetFoto.js';
import "../../styles/PerfilEntrenadorPrivado.css";
import { motion } from 'framer-motion';
import { Toaster, toast } from "sonner";

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
      const updatedUsuarios = usuarios.map((usuario) => {
        if (usuario.id === userId) {
          actions.EditarFotos(id, secureUrl)
          toast.success("foto actualizada correctamente")
          return { ...usuario, foto: responseData.secure_url };
        }
        return usuario;
      });

      setUsuarios(updatedUsuarios);
    } catch (error) {
      toast.error("Error al subir la imagen:", error);
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
    const storeID = localStorage.getItem("user_id")
    if (storeID == id){
      const fetchUsuarioUnico = async () => {
        await actions.GetEntrenadorUnico(id);
        const usuariofinal = store.usuarioUnico;
        if (usuariofinal && Array.isArray(usuariofinal)) {
          setUsuarios(usuariofinal);
        } else {
          setUsuarios([usuariofinal]);
        }
      };
      setRol(true)
      fetchUsuarioUnico();
    } else { setRol(false), "deja de jode" }
  }, [editar, usuarios.foto]);


  return (
    <>
    <Toaster position="top-center" richColors/>
    <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

      {rol ? (
        <div className="container contenedorPerfilPrivado">
          <div className="contenedorTituloPerfil">
            <div className="form-group TituloPerfil">PERFIL</div>
          </div>
          <ul className="contenedorListaEntrenadores">
            {Array.isArray(usuarios) && usuarios.map((usuario) => (
              <li key={usuario.id} className="entrenadorItem">
                <div className="card perfilCard">
                  <div className="containerTopEntrenador">
                    <img src={usuario.foto} className="card-img-topEntrenador" alt={`Imagen de ${usuario.nombre}`} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-titlePrivado">{usuario.nombre}</h5>
                    <p className="card-text-Datos">Datos Personales</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-itemDatosPersonales">Email: {usuario.email}</li>
                    <li className="list-group-itemDatosPersonales">Nombre: {usuario.nombre}</li>
                    <li className="list-group-itemDatosPersonales">Teléfono: {usuario.telefono}</li>
                    <li className="list-group-itemDatosPersonales">Edad: {usuario.edad}</li>
                    <li className="list-group-itemDatosPersonales">Género: {usuario.genero}</li>
                    <li className="list-group-itemDatosPersonales">Altura: {usuario.altura}</li>
                    <li className="list-group-itemDatosPersonales">Tipo De Entrenamiento: {usuario.tipo_entrenamiento}</li>
                  </ul>
                </div>
                <div className="input-containerSubirImagen">
                  <UploadWidgetFoto userId={usuario.id} onUploadSuccess={handleSubirImagen} />
                </div>
                {editar ? (
                  <>
                    <input className="input form-control"
                      type="text"
                      name="email"
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
        <h1 className="errorInicio"> ERROR, Vuelve a Iniciar Sesion </h1>
      )}
    </motion.div>
    </>
  );
};
