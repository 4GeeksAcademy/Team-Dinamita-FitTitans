import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import "../../styles/VideosUsuario.css"
import { motion } from 'framer-motion';

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
    <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}>

      <div className="containerPrincipalVideo">
          <div className="contenedorTituloVideo">
              <div className="tituloVideo">
                  VIDEOS
              </div>
          </div>
          <div className="formularioVideo">
              {rol ? (
                  <div>
                      {videos.length > 0 ? (
                          <div className="gridVideos">
                              {videos.map((video, index) => (
                                  <div key={index} className="videoItem">
                                      <video src={video.url} controls className="videoControl" />
                                      <p className="text-light">Título: {video.titulo}</p>
                                      <p className="text-light">Subido por: {video.nombreUsuario}</p>
                                  </div>
                              ))}
                          </div>
                      ) : (
                          <h1 className="text-light">No hay videos aún</h1>
                      )}
                  </div>
              ) : (
                  <h1 className="text-light">No hay videos aún</h1>
              )}
          </div>
      </div>

    </motion.div>
    </>
);
};
