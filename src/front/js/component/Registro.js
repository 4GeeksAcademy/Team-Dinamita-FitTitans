import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "/workspaces/Team-Dinamita-FitTitans/src/front/styles/registro.css"


export const Registro = ({ closeModal }) => {
  const [usuarios, setUsuarios] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    contraseña: "",
    esEntrenador: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica de registro, por ejemplo, enviar datos al backend
    navigate("/");
    closeModal(); // Cerrar la modal después de enviar el formulario
  };

  const handleRoleChange = (e) => {
    const isEntrenador = e.target.value === "2";
    setUsuarios({ ...usuarios, esEntrenador: isEntrenador });
    console.log(usuarios)
  };
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          
          <form onSubmit={handleSubmit}>
            <div className="container mt-5 editcontact">
            <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">Selecciona Rol</label>
                <select 
                  className="form-select" 
                  id="inputGroupSelect01" 
                  required 
                  onChange={handleRoleChange}
                  defaultValue=""
                >
                  <option value="" disabled>Choose...</option>
                  <option value="2">Usuario</option>
                  <option value="1">Entrenador</option>
                </select>
            </div>
              <div className="">
                <label className="form-label d-flex text-start">
                  <i className="fa fa-user bigicon mx-2" style={{ color: "#E7A33E", fontSize: 24 }}></i>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="form-control"
                  minLength={3}
                  required={true}
                  onChange={(e) => setUsuarios({ ...usuarios, nombre: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="my-3">
                <label className="form-label d-flex text-start">
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
                <label className="form-label d-flex text-start">
                  <i className="fas fa-phone-square mx-2" style={{ color: "#E7A33E", fontSize: 24 }}></i>
                  telefono
                </label>
                <input
                  type="text"
                  className="form-control"
                  minLength={3}
                  required={true}
                  onChange={(e) => setUsuarios({ ...usuarios, telefono: e.target.value })}
                  placeholder="+34-666-66-66-66"
                />
              </div>
              <div className="my-3">
                <label className="form-label d-flex text-start">
                  <i className="fas fa-key mx-2" style={{ color: "#E7A33E", fontSize: 24 }}></i>
                  contraseña
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
              <div className="form-check">
                <input className="form-check-input" type="checkbox"  id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Acepto terminos y condiciones politica de privacidad
                </label>
                <div className="info-box">
                  acepto que Anna, Jose y Ronald usen mis datos para hacer test de este hover
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <input type="submit" value={"Registrarse"} className="btn btn-primary mx-3 text-dark" style={{ background: "#E7A33E"}}></input>

                <button className=" btn btn-primary mx-3 text-dark" style={{ background: "#E7A33E"}} onClick={closeModal}>close</button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
