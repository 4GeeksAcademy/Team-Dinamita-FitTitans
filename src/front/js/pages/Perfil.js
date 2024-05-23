import React, { useState } from "react";

export const Perfil = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Usuario 1", imagen: "", telefono : "123", altura : "13", peso : "200", genero :"H" , acepto: false},
    
    // Otros usuarios...
  ]);

  const handleSubirImagen = async (userId, file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ronald_prueba");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djwkdsahw/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const responseData = await response.json();

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

  const handleEditarUsuario = (userId) => {
    // Lógica para permitir la edición del usuario
    console.log("Editar usuario con ID:", userId);
  };



  return (
<>
    <div className="container d-flex justify-content-center">
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <h1>{usuario.nombre}</h1>
            <div>
                <div className="card" style={{width: 400}}>
                    <img src={usuario.imagen} className="card-img-top" alt={`Imagen de ${usuario.nombre}`}/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Nombre: {usuario.nombre}</li>
                        <li className="list-group-item">Movil: {usuario.telefono}</li>
                        <li className="list-group-item">Peso: {usuario.peso}</li>
                        <li className="list-group-item">altura: {usuario.altura}</li>
                        <li className="list-group-item">Genero: {usuario.genero}</li>
                    </ul>
                    <div className="card-body">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
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
                onChange={(e) => handleSubirImagen(usuario.id, e.target.files[0])}
              />
              <input className="form-control" onClick={() => handleEditarUsuario(usuario.id)}/>
            </div>
          </li>
        ))}
      </ul>
    </div>
</>
  );
};
