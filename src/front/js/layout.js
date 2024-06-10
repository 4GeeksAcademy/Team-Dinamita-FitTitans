import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { PerfilEntrenador } from "./pages/perfilEntrenador.jsx"
import { IniciarSesion } from "./component/IniciarSesion.jsx";
import { Registro } from "./component/Registro";
import { PerfilUsuarios } from "./component/PerfilUsuarios.js";
import { Contactanos } from "./pages/Contactanos.jsx";
import { MiArea } from "./pages/MiArea.jsx";
import { MiAreaRegistrado } from "./pages/MiAreaUsuarioRegistrado.jsx";
import { MiAreaCliente } from "./component/MiAreaCliente.jsx";
import { MiAreaEntrenador } from "./component/MiAreaEntrenador.jsx";
import { FormulaCalorias } from "./pages/FormulaCalorias.jsx";
import { Rutinas } from "./pages/Rutinas.jsx";

import { ListaEntrenadores } from "./pages/ListaEntrenadores.jsx";
import { Dieta } from "./pages/Dieta.jsx"
import { Blog } from "./pages/Blog.jsx"
import { Perfiles } from "/workspaces/Team-Dinamita-FitTitans/src/front/js/pages/Perfiles.jsx";
import { PerfilEntrenadorPrivado } from "./component/PerfilEntrenadorPrivado.js";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<IniciarSesion />} path="login" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<Perfiles />} path="/perfiles/:id" />
                        <Route element={<PerfilUsuarios />} path="/perfil/:id" />
                        <Route element={<PerfilEntrenador />} path="/listaentrenadores/:entrenador_id" />
                        <Route element={<PerfilEntrenadorPrivado />} path="/PerfilEntrenadorPrivado/:id" />
                        <Route element={<Contactanos />} path="/contactanos" />
                        <Route element={<MiArea />} path="/miarea" />
                        <Route element={<MiAreaRegistrado />} path="/miarea/registrado" />
                        <Route element={<MiAreaCliente />} path="/miarea/cliente" />
                        <Route element={<MiAreaEntrenador />} path="/miarea/entrenador/" />
                        <Route element={<FormulaCalorias />} path="/formulacalorias" />
                        <Route element={<Rutinas />} path="/rutinas" />
                        <Route element={<ListaEntrenadores />} path="/listaentrenadores" />
                        <Route element={<Dieta />} path="/dieta" />
                        <Route element={<Blog />} path="/blog" />



                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
