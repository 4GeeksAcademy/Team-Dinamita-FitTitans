import React, { useEffect, useRef, useState } from "react";
import "../../styles/VideosEntrenador.css"
import { motion } from 'framer-motion';

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

          setSecureUrl(result.info.secure_url);
          onUploadSuccess(result.info.secure_url, titulo); // Enviar URL y título al callback
        }
      }
    );
  }, [onUploadSuccess, titulo]); // Incluir 'titulo' como dependencia del efecto

  return (
    <>
    <motion.div
		onClick={(e) => e.stopPropagation()}
		initial={{ y: -50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 50, opacity: 0 }}
		transition={{ duration: 0.5 }}> 
    <div>
      <button className="btnSubir" onClick={() => widgetRef.current.open()}>Subir Video</button>
      {secureUrl && (
        <div>
          <p className="textVideoSubido">Video subido correctamente!</p>
          {titulo && <p className="text-light">Título: {titulo}</p>}
        </div>
      )}
    </div>
    </motion.div>
    </>
  );
};

export default UploadWidget;
