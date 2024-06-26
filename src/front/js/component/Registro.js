import React, { useState, useContext } from "react";
import { useNavigate, } from "react-router-dom";
import "../../styles/registro.css"
import { Context } from "../store/appContext";

export const Registro = ({ closeModal }) => {
  const { store, actions } = useContext(Context);


  const [usuario, setUsuarios] = useState({
    email: "",
    password: "",
    rol: "",
    telefono: "",
    nombre: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const rolBooleano = usuario.rol === "1" ? true : false;
    const usuarioConRolBooleano = { ...usuario, rol: rolBooleano };
    const registroExitoso = await actions.HandleRegistro(usuarioConRolBooleano);

    if (registroExitoso.success) {
      alert("success");
      closeModal();
    } else {
      alert("unexpected error");
    }
  };



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
              <div className="d-flex justify-content-center">
                <input type="submit" value={"Registrarse"} className="btn btn-primary mx-3 text-dark" style={{ background: "#E7A33E" }}></input>

                <button className=" btn btn-primary mx-3 text-dark" style={{ background: "#E7A33E" }} onClick={closeModal}>Close</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
