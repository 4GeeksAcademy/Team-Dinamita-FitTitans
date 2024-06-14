import React, { useState, useContext, useEffect } from "react";
import "../../styles/Navbar.css";
import "/workspaces/Team-Dinamita-FitTitans/src/front/styles/IniciarSesion.css"
import { useNavigate, Link } from "react-router-dom";
import { Registro } from "./Registro";
import { MiAreaUsuarioRegistrado } from "//workspaces/Team-Dinamita-FitTitans/src/front/js/pages/MiAreaUsuarioRegistrado.jsx"
import firebaseApp from "../../../firebase/credenciales";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Context } from "../store/appContext";


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

//

export const IniciarSesion = () => {
  const [usuarios, setUsuarios] = useState({
    email: "",
    password: "",
  });
  const [sesion, setSession] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);


  /* const getRol = async (uid) => {
     const documentoRef = doc(firestore, `/usuarios/${uid}`);
     const documentoCif = await getDoc(documentoRef);
     const infoFinal = documentoCif.data().rol;
     return infoFinal
   };*/

  //const EstadoUsuarioFirebase = (usuarioFirebase) => {

  /*getRol(usuarioFirebase.uid).then((rol) => {
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
});*/

  const idUsuario = () => {

  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //signInWithEmailAndPassword(auth, usuarios.correo, usuarios.contraseña)
    const verificar = await actions.HandleInicioSesion(usuarios);
    console.log(verificar)
    if (verificar === true) {
      alert("funciono")

      navigate("/miarea")
    }else{
      alert("error")
    }
  };

  return (
    <>
      {store.seInicio ? (<h1>error</h1>)
        : (
          <>
            <form className="container InicioSesion" onSubmit={handleSubmit} id="inicio">
              <div className="my-3">
                <label className="form-label d-flex text-start text-light" id="email">
                  <i className="fas fa-envelope mx-2" ></i>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  minLength={3}
                  required={true}
                  onChange={(e) => setUsuarios({ ...usuarios, email: e.target.value })}
                  placeholder="name@example.com"
                />
              </div>
              <div className="my-3">
                <label className="form-label d-flex text-start text-light" id="contraseña">
                  <i className="fas fa-key mx-2" ></i>
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  minLength={3}
                  required={true}
                  placeholder="******************"
                  onChange={(e) => setUsuarios({ ...usuarios, password: e.target.value })}
                />
              </div>
              <div className="botonNavbar container d-flex justify-content-center">
                <input
                  type="submit"
                  value={"Iniciar Sesion"}
                  className="btn btn-Navbar mx-3 "
                />
                <Link to="/solicitud">
                  <input
                    type="submit"
                    value={"Recuperar Contraseña"}
                    className="btn btn-Navbar mx-3 "
                  />
                </Link>
              </div>

            </form>
            {isModalOpen && <Registro closeModal={closeModal} />}
          </>)}
    </>
  )
}