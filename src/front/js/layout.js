import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { IniciarSesion } from "./component/IniciarSesion.jsx";
import { Registro } from "./component/Registro";
import { PerfilUsuarios } from "./component/PerfilUsuarios.js";
import { Contactanos } from "./pages/Contactanos.jsx";
import { MiArea } from "./pages/MiArea.jsx";
import { MiAreaCliente } from "./component/MiAreaCliente.jsx";
import { MiAreaEntrenador } from "./component/MiAreaEntrenador.jsx";
import { FormulaCalorias } from "./pages/FormulaCalorias.jsx";
import { Rutinas } from "./pages/Rutinas.jsx";
import { RutinaCliente } from "./pages/RutinasCliente.jsx";
import { VideosEntrenador } from "./pages/VideosEntrenador.jsx"
import { ListaEntrenadores } from "./pages/ListaEntrenadores.jsx";
import { Dieta } from "./pages/Dieta.jsx"
import { DietaCliente } from "./pages/DietaCliente.jsx";

import { Perfiles } from "./pages/Perfiles.jsx";
import { PerfilEntrenadorPrivado } from "./component/PerfilEntrenadorPrivado.js";
import { RecuperarContraseña } from "./pages/RecuperarContraseña.jsx";
import { SolicitudRecuperacion } from "./pages/SolicitudRecuperarcion.jsx";
import { ListaDeClientes } from "./pages/ListaDeClientes.jsx";
import { DetalleCliente } from "./pages/DetalleCliente.jsx";
import { Chat } from "./component/Chat/Chat.jsx"
import { VideosUsuarios } from "./pages/VideosUsuario.jsx";
import { ChatEntrenador } from "./component/Chat/ChatEntrenador.jsx";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
//<Route element={<ChatEntrenador />} path="/clientes/:cliente_id/chat" />
//<Route element={<Chat />} path="/chat/:id" />
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<IniciarSesion />} path="login" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<RecuperarContraseña />} path="/reset-password/:user_uuid" />
                        <Route element={<SolicitudRecuperacion />} path="/solicitud" />
                        <Route element={<Perfiles />} path="/perfiles/:id" />
                        <Route element={<PerfilUsuarios />} path="/perfil/:id" />
                        <Route element={<PerfilEntrenadorPrivado />} path="/PerfilEntrenadorPrivado/:id" />
                        <Route element={<Contactanos />} path="/contactanos" />
                        <Route element={<MiArea />} path="/miarea" />
                        <Route element={<MiAreaCliente />} path="/miarea/cliente" />
                        <Route element={<MiAreaEntrenador />} path="/miarea/entrenador/" />
                        <Route element={<FormulaCalorias />} path="/formulacalorias" />
                        <Route element={<Rutinas />} path="/rutinas" />
                        <Route element={<ListaEntrenadores />} path="/listaentrenadores" />
                        <Route element={<ListaDeClientes />} path="/listaclientes" />
                        <Route element={<ListaDeClientes />} path="/entrenador/:entrenador_id/clientes" />
                        <Route element={<DetalleCliente />} path="/clientes/:cliente_id" />
                        <Route element={<Chat />} path="/chat/:id" />
                        <Route element={<Rutinas />} path="/clientes/:cliente_id/rutina" />
                        <Route element={<RutinaCliente />} path="/cliente/rutina/:usuario_id" />
                        <Route element={<VideosEntrenador />} path="/videosentrenador/:id" />
                        <Route element={<VideosUsuarios />} path="/videousuario/:id" />
                        <Route element={<Dieta />} path="/clientes/:cliente_id/dieta" />
                        <Route element={<DietaCliente />} path="/cliente/dieta/:usuario_id" />
                        <Route element={<ChatEntrenador />} path="/clientes/:cliente_id/chat" />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
