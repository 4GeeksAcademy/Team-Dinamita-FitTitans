import React, { useState } from "react";
import "../../styles/Navbar.css";
import "/workspaces/Team-Dinamita-FitTitans/src/front/styles/IniciarSesion.css"
import { useNavigate } from "react-router-dom";
import { Registro } from "./Registro";
import { MiAreaRegistrado } from "../pages/MiAreaUsuarioRegistrado.jsx"
import firebaseApp from "../../../firebase/credenciales";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

//

export const IniciarSesion = () => {
  const [usuarios, setUsuarios] = useState({
    correo: "",
    contraseña: "",
    rol: "",
  });
  const [sesion, setSession] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  const getRol = async (uid) => {
    const documentoRef = doc(firestore, `/usuarios/${uid}`);
    const documentoCif = await getDoc(documentoRef);
    const infoFinal = documentoCif.data().rol;
    return infoFinal
  };

  const EstadoUsuarioFirebase = (usuarioFirebase) => {
    getRol(usuarioFirebase.uid).then((rol) => {
      const dataUsuario = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      }
      setSession(dataUsuario);
      console.log(dataUsuario)
    })
  }
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!sesion) {
        EstadoUsuarioFirebase(usuarioFirebase);
      } else navigate("/")
    } else {
      setSession(null)
    }
  });



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, usuarios.correo, usuarios.contraseña)
  };

  return (
    <>
      {sesion ? (<h1>error</h1>)
        : (
<<<<<<< HEAD
          <>
            <form className="container mt-5" onSubmit={handleSubmit}>
              <div className="my-3">
=======
        <>
        <form className="container" onSubmit={handleSubmit} id="inicio">
            <div className="my-3">
>>>>>>> 1f06f95a42075b83c0046546ffcd80a9384533f9
                <label className="form-label d-flex text-start text-light" id="email">
                  <i className="fas fa-envelope mx-2" style={{ color: "#E7A33E", fontSize: 24 }}></i>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  minLength={3}
                  required={true}
                  onChange={(e) => setUsuarios({ ...usuarios, correo: e.target.value })}
                  placeholder="name@example.com"
                />
              </div>
              <div className="my-3">
                <label className="form-label d-flex text-start text-light" id="contraseña">
                  <i className="fas fa-key mx-2" style={{ color: "#E7A33E", fontSize: 24 }}></i>
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  minLength={3}
                  required={true}
                  placeholder="******************"
                  onChange={(e) => setUsuarios({ ...usuarios, contraseña: e.target.value })}
                />
              </div>
              <div className="botonNavbar container d-flex justify-content-center">
                <input
                  type="submit"
                  value={"iniciar Sesion"}
                  className="btn btn-Navbar mx-3 "
                />
<<<<<<< HEAD
              </div>
            </form>
            <div className="container d-flex justify-content-center">
              <button className="btn btn-Navbar mt-3 " onClick={openModal}>
                Registrarse
              </button>
            </div>
            {isModalOpen && <Registro closeModal={closeModal} />}
          </>)}
    </>
  )
=======
		    </div>
        
        </form>
         </> ) }
        </>
    )
>>>>>>> 1f06f95a42075b83c0046546ffcd80a9384533f9
}