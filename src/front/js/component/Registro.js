import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/registro.css";
import { Context } from "../store/appContext";
import { motion } from 'framer-motion';
import { Toaster, toast } from "sonner";

export const Registro = ({ closeModal }) => {
  const { store, actions } = useContext(Context);

  const [usuario, setUsuarios] = useState({
    email: "",
    password: "",
    rol: "",
    nombre: "",
  });

  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rolBooleano = usuario.rol === "1" ? true : false;
    const usuarioConRolBooleano = { ...usuario, rol: rolBooleano };
    const registroExitoso = await actions.HandleRegistro(usuarioConRolBooleano);


    
    if (registroExitoso.success) {
      toast.success("success");
      closeModal();
    } else {
      toast.error("unexpected error");
    }
  };

  const validatePassword = async (e) => {
    const password = e.target.value;
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])/;
    if (!regex.test(password)) {
      return false
    } else {
      setPasswordError('');
      setUsuarios({ ...usuario, password: password })
      console.log(usuario.password)
    }
  };

  return (
    <motion.div
    className="modal-overlay"
    onClick={closeModal}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="modal-dialog modal-dialog-centered"
      onClick={(e) => e.stopPropagation()}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
                <i className="fa fa-user bigicon mx-2"></i>
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
                <i className="fas fa-envelope mx-2"></i>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                required={true}
                onChange={(e) => setUsuarios({ ...usuario, email: e.target.value })}
                placeholder="name@example.com"
              />
            </div>
            <div className="my-3">
              <label className="form-label d-flex text-start">
                <i className="fas fa-key mx-2"></i>
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                minLength={8}
                required={true}
                placeholder="******************"
                onChange={(e) => {
                  setUsuarios({ ...usuario, password: e.target.value });
                  validatePassword(e);
                }}
                pattern="(?=.*[A-Z])(?=.*[!@#$&*]).{3,}"
                title="La contraseña debe contener al menos una letra mayúscula y un carácter especial."
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </div>
            <div className="d-flex justify-content-center">
              <input
                type="submit"
                value={"Registrarse"}
                className="btn btn-primary mx-3 text-dark"
                style={{ background: "#E7A33E" }}
              />
              <button
                className="btn btn-primary mx-3 text-dark"
                style={{ background: "#E7A33E" }}
                onClick={closeModal}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster position="top-center" richColors/>
    </motion.div>
  </motion.div>
  );
};
