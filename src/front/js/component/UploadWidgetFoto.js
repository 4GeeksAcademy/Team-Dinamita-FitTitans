import React, { useEffect, useRef, useState } from "react";
import "../../styles/PerfilUsuario.css";
const UploadWidgetFoto = ({ userId, onUploadSuccess }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [secureUrl, setSecureUrl] = useState();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'djwkdsahw',
        uploadPreset: 'ronald_prueba',
        resourceType: 'image', // Aseguramos que solo acepte imagenes,
        clientAllowedFormats: ["jpg", "jpeg", "png"], // Permitir formatos específicos
      },
      (error, result) => {
        if (error) {
          console.error("Upload Error:", error);
        } else if (result.event === "success") {

          setSecureUrl(result.info.secure_url);
          onUploadSuccess(userId, result.info.secure_url); // Pasar userId y secureUrl
        }
      }
    );
  }, [onUploadSuccess, userId]);

  return (
    <div>
      <button className= "btnSubir" onClick={() => widgetRef.current.open()}>Subir Foto</button>
      {secureUrl && (
        <div>
          <p className="text-light">Foto subida correctamente!</p>
        </div>
      )}
    </div>
  );
};

export default UploadWidgetFoto;
