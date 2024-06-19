import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import UploadWidget from '../component/UploadWidget.js';
import "../../styles/VideosEntrenador.css"

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
      alert("Video subido correctamente");
      setVideos([...videos, { url: secureUrl, titulo }]); // Agregar el nuevo video al estado local
    } catch (error) {
      console.error("Error al subir el video:", error);
      // Manejar errores de subida de video aquí
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

  console.log(store.usuarioUnico, "prueba");
  console.log(videos);

  return (
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
  );
};
