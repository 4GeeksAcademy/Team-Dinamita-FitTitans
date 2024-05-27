import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/MiAreaRegistrado.css";
import firebaseApp from "../../../firebase/credenciales";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


export const MiAreaRegistrado = () => {
	const [sesion, setSession] = useState(null)

	const getRol = async(uid) =>{
		const documentoRef = doc(firestore, `/usuarios/${uid}`);
		const documentoCif = await getDoc(documentoRef);
		const infoFinal = documentoCif.data().rol;
		return infoFinal
	  };
  
	const EstadoUsuarioFirebase = (usuarioFirebase) => {
		getRol(usuarioFirebase.uid).then((rol) =>{
		  const dataUsuario = {
		  uid :usuarioFirebase.uid,
		  email: usuarioFirebase.email,
		  rol : rol,
		}
		setSession(dataUsuario);
		console.log(dataUsuario)
		})
	  };
	onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase) {
          if(!sesion){
            EstadoUsuarioFirebase(usuarioFirebase);
          }
        }else{
          setSession(null)
        }
      });
	return (
<>
{sesion && sesion.rol === "usuario" ? (

	<div className="container">
			<div className="row row-filaMiAreaRegistrado">
				<div className="col-md-4 columnaPerfilRegistrado ">
					<div className="tituloPerfilRegistrado">
						<Link to="/" className="linkPerfilRegistrado">PERFIL USUARIO</Link>
					</div>
				</div>
				<div className="col-md-4 columnaConoceEntrenadoresRegistrado">
					<div className="tituloConoceEntrenadoresRegistrado">
						<Link to="/" className="linkConoceEntrenadoresRegistrado">CONOCE NUESTROS ENTRENADORES</Link>
					</div>
				</div>
				<div className="col-md-4 columnaCalculaCaloriasRegistrado">
					<div className="tituloCalculaCaloriasRegistrado">
						<Link to="/" className="linkCalculaCaloriasRegistrado">CALCULA TUS CALORIAS</Link>
					</div>
				</div>
			</div>
</div>
): (<h1 className='text-light'> Area Entrenador</h1>)}

</>
	)
};