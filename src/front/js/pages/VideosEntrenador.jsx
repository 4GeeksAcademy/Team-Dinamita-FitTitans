import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import UploadWidget from '../component/UploadWidget.js';
import "../../styles/VideosEntrenador.css"
import { motion } from 'framer-motion';
import { Toaster, toast } from "sonner";

export const VideosEntrenador = () => {
  const { store, actions } = useContext(Context);
  const [videos, setVideos] = useState([]);
  const [rol, setRol] = useState(false); // Inicialmente no hay rol
  const [tituloVideo, setTituloVideo] = useState(""); // Estado para almacenar el título del video
  const { id } = useParams();
  const token = localStorage.getItem("jwt-token");

  const handleSubirVideo = async (secureUrl, titulo) => {
    try {
      await actions.Videos(id, secureUrl, token, titulo);
      toast.success("Video subido correctamente");
      setVideos([...videos, { url: secureUrl, titulo }]); // Agregar el nuevo video al estado local
    } catch (error) {
      toast.error("Error al subir el video:", error);
    }
  };

  useEffect(() => {
    const fetchEntrenadorUnico = async () => {
      await actions.GetEntrenadorUnico(id);
      const usuariofinal = store.usuarioUnico;
      if (usuariofinal && Array.isArray(usuariofinal.videos)) {
        const parsedVideos = usuariofinal.videos.map(video => ({
          url: video.url.replace(/^"(.*)"$/, '$1'),
          titulo: video.titulo
        })); // Eliminar comillas adicionales si es necesario
        setVideos(parsedVideos);
      } else {
        setVideos([]); // Inicializar videos como un array vacío si no hay videos
      }
      setRol(true); // Establecer rol en true después de cargar el perfil del entrenador
    };

    fetchEntrenadorUnico();
  }, [id]); // Ejecutar efecto cuando cambia el id



  return (
    <>
    <Toaster position="top-center" richColors/>
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
          <div className="input-containerSubirVideo">
            <UploadWidget onUploadSuccess={handleSubirVideo} titulo={tituloVideo} />
            <input
              type="text"
              value={tituloVideo}
              onChange={(e) => setTituloVideo(e.target.value)}
              placeholder="Ingrese el título del video"
              className="inputTituloVideo"
            />
          </div>
        </div>
      </div>

    </motion.div>
    </>
  );
};
