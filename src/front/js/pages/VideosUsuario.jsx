import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '/workspaces/Team-Dinamita-FitTitans/src/front/js/store/appContext.js';

export const VideosUsuarios = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [rol, setRol] = useState(null); // Inicialmente no hay rol
  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        await actions.ObtenerVideos(token);
        const usuarios = store.videos; // Asegúrate de que 'store.videos' contiene la estructura correcta
        console.log(usuarios);

        if (usuarios && Array.isArray(usuarios)) {
          // Extraer videos de cada usuario junto con el nombre del usuario
          const allVideos = usuarios.flatMap(usuario => 
            usuario.videos.map(video => ({
              url: video.url.replace(/^"(.*)"$/, '$1'),
              titulo: video.titulo,
              nombreUsuario: usuario.nombre // Agregar el nombre del usuario
            }))
          );

          setVideos(allVideos);
          setRol(true);
        } else {
          setVideos([]); // Inicializar videos como un array vacío si no hay videos
          setRol(false);
        }
      } catch (error) {
        console.error("Error al obtener los videos:", error);
        setRol(false);
      }
    };

    fetchVideos();
  }, [ ]);

  return (
    <>
      {rol ? (
        <div id="contenedor videos container mt-4">
          {videos.length > 0 ? (
            <ul>
              {videos.map((video, index) => (
                <li key={index}>
                  <video src={video.url} controls style={{ maxWidth: '300px' }} />
                  <p className="text-light">Título: {video.titulo}</p>
                  <p className="text-light">Subido por: {video.nombreUsuario}</p>
                </li>
              ))}
            </ul>
          ) : (
            <h1 className='text-light'>No hay videos aún</h1>
          )}
        </div>
      ) : (
        <h1 className='text-light'>No hay videos aún</h1>
      )}
    </>
  );
};
