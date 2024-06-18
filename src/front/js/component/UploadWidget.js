import React, { useEffect, useRef, useState } from "react";
import "/workspaces/Team-Dinamita-FitTitans/src/front/styles/VideosEntrenador.css"

const UploadWidget = ({ onUploadSuccess, titulo }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [secureUrl, setSecureUrl] = useState();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'djwkdsahw',
        uploadPreset: 'ronald_prueba',
        resourceType: 'video' // Aseguramos que solo acepte videos
      },
      (error, result) => {
        if (error) {
          console.error("Upload Error:", error);
        } else if (result.event === "success") {
          console.log("Upload Result:", result.info.secure_url);
          setSecureUrl(result.info.secure_url);
          onUploadSuccess(result.info.secure_url, titulo); // Enviar URL y título al callback
        }
      }
    );
  }, [onUploadSuccess, titulo]); // Incluir 'titulo' como dependencia del efecto

  return (
    <div>
      <button className="btnSubir" onClick={() => widgetRef.current.open()}>Subir Video</button>
      {secureUrl && (
        <div>
          <p className="textVideoSubido">Video subido correctamente!</p>
          {titulo && <p className="text-light">Título: {titulo}</p>}
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
