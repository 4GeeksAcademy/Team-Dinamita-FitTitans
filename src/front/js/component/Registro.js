import React, { useState, useContext } from "react";
import { useNavigate, } from "react-router-dom";
import "/workspaces/Team-Dinamita-FitTitans/src/front/styles/registro.css"
import firebaseApp from "../../../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Context } from "../store/appContext";
const auth = getAuth(firebaseApp)


export const Registro = ({ closeModal }) => {
  const { store, actions } = useContext(Context);
  const firestore = getFirestore(firebaseApp);

  const [usuario, setUsuarios] = useState({
    email: "",
    password: "",
    rol: "",
    telefono: "",
    nombre: "",
  });


  //const email = usuarios.correo;
  //const rol = usuarios.rol


  const RegistrarUsuario = async () => {
    navigate("/login"); // esto y la funcion van en el handle submit
    const infoUsuario = await createUserWithEmailAndPassword(auth, usuario.email, usuario.password).then(
      (usuarioFirebase) => { return usuarioFirebase }
    )
    console.log(infoUsuario.user.uid)

    const documentoRef = doc(firestore, `/usuarios/${infoUsuario.user.uid}`)
    setDoc(documentoRef,)//{//email, //rol})
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convierte el valor de 'rol' a booleano
    const rolBooleano = usuario.rol === "1" ? true : false;
    // Actualiza el objeto de usuario con el valor de 'rol' convertido a booleano
    const usuarioConRolBooleano = { ...usuario, rol: rolBooleano };
    const registroExitoso = await actions.HandleRegistro(usuarioConRolBooleano);
    console.log(registroExitoso.success)
    if (registroExitoso.success) {
      alert("success");
      closeModal();
    } else {
      alert("unexpected error");
    }
  };

  console.log(usuario)

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">

          <form onSubmit={handleSubmit}>
            <div className="container mt-5 editcontact">
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="rol" id="rol">Selecciona Rol</label>
                <select
                  className="form-select"
                  id="rol"
                  required
                  onChange={(e) => setUsuarios({ ...usuario, rol: e.target.value })}
                  defaultValue=""
                >
                  <option value="" disabled>Choose...</option>
                  <option value="0">Usuario</option>
                  <option value="1">Entrenador</option>
                </select>
              </div>

              <div className="">
                <label className="form-label d-flex text-start">
                  <i className="fa fa-user bigicon mx-2" ></i>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="form-control"
                  minLength={3}
                  required={true}
                  onChange={(e) => setUsuarios({ ...usuario, nombre: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="my-3">
                <label className="form-label d-flex text-start">
                  <i className="fas fa-envelope mx-2" ></i>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  minLength={3}
                  required={true}
                  onChange={(e) => setUsuarios({ ...usuario, email: e.target.value })}
                  placeholder="name@example.com"
                />
              </div>

              <div className="my-3">
                <label className="form-label d-flex text-start">
                  <i className="fas fa-phone-square mx-2" ></i>
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control"
                  minLength={3}
                  required={true}
                  onChange={(e) => setUsuarios({ ...usuario, telefono: e.target.value })}
                  placeholder="+34-666-66-66-66"
                />
              </div>

              <div className="my-3">
                <label className="form-label d-flex text-start">
                  <i className="fas fa-key mx-2" ></i>
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  minLength={3}
                  required={true}
                  placeholder="******************"
                  onChange={(e) => setUsuarios({ ...usuario, password: e.target.value })}
                />
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Acepto terminos y condiciones politica de privacidad
                </label>
                <div className="info-box">
                  Acepto que Anna, Jose y Ronald usen mis datos para hacer test de este hover
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <input type="submit" value={"Registrarse"} className="btn btn-primary mx-3 text-dark" style={{ background: "#E7A33E" }}></input>

                <button className=" btn btn-primary mx-3 text-dark" style={{ background: "#E7A33E" }} onClick={closeModal}>close</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
