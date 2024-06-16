import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '/workspaces/Team-Dinamita-FitTitans/src/front/js/store/appContext.js';


export const VideosUsuarios = ()=>{
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [video, setVideo] = useState([]);
    const [rol, setRol] = useState(null); // Inicialmente no hay rol
    const token = localStorage.getItem("jwt-token");

    useEffect(()=>{
    try{
        const ObtenerVideos = async () => {
            await actions.ObtenerVideos(id, token)
            const videofinal = store.videos;
            console.log(store.videos)
            if (videofinal && Array.isArray(videofinal)) {
                const parsedVideos = videofinal.map(video => ({
                  url: video.url.replace(/^"(.*)"$/, '$1'),
                  titulo: video.titulo
                })); // Eliminar comillas adicionales si es necesario
                setVideo(parsedVideos);
                setRol(true)
            } else {
                setVideo([]); // Inicializar videos como un array vacío si no hay videos
            };
            ObtenerVideos()
    };}catch{
        setRol(false)
    }
    },[]);

    console.log(store.videos)
    return(
<>
    <div>
      {rol ? (
        <div>
          {video.length > 0 ? (
            <ul>
              {video.map((video, index) => (
                <li key={index}>
                  <video src={video.url} controls style={{ maxWidth: '300px' }} />
                  <p className="text-light">Título: {video.titulo}</p>
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
    </div>
</>
    )
}