const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			seInicio: null,
			rol: null,
			usuarios: [],
			id: [],
			usuarioUnico: [],
			entrenadores: [],
		},
		actions: {
			// Use getActions to call a function within a fuction

			// Archivo Contactanos
			handleSubmitContactanos: (contactoFormulario) => {
				return fetch('https://vigilant-invention-7vv6g76ww4543x9xg-3001.app.github.dev/contactanos', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(contactoFormulario)
				})
					.then(response => {
						if (response.ok) {
							setStore({
								contactoFormulario: {
									name: '',
									email: '',
									message: ''
								}
							});
							return 'Mensaje enviado!';
						} else {
							throw new Error('Error al enviar el mensaje.');
						}
					})
					.catch(error => {
						console.error('Error:', error);
						throw new Error('Error al enviar el mensaje.');
					});
			},

			HandleRegistro: async ({ email, password, rol, nombre, telefono }) => {
				try {
					const response = await fetch('https://glowing-spork-jj94vv5pq7p2ppw7-3001.app.github.dev/registro', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password,
							rol: rol ? true : false,
							nombre: nombre,
							telefono: telefono
						}),
					});

					if (response.ok) {
						// Si el registro es exitoso, obtenemos la respuesta del backend
						const responseData = await response.json();
						// Extraemos el ID de usuario de la respuesta
						const userId = responseData.userId;
						// Devolvemos un objeto con el valor booleano y el ID de usuario
						return { success: true, userId: userId };
					} else {
						const errorData = await response.json();
						console.log(errorData);
						return { success: false };
					}
				} catch (error) {
					console.log('Error:', error);
					return { success: false };
				}
			},



			HandleInicioSesion: async ({ email, password }) => {
				try {
					const response = await fetch('https://glowing-spork-jj94vv5pq7p2ppw7-3001.app.github.dev/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password,
						}),
					});

					if (!response.ok) {
						console.log('Error al enviar datos');
						return false
					} else if (response.ok) {
						const data = await response.json();
						console.log('Datos guardados correctamente:', data);
						localStorage.setItem("jwt-token", data.token);
						localStorage.setItem("user_rol", data.user_rol);
						localStorage.setItem("user_id", data.id)
						setStore({ id: data.id })
						console.log(localStorage.getItem("jwt-token"));
						setStore({ seInicio: true })
						setStore({ rol: data.user_rol })
						return true
					}

				} catch (error) {
					console.log('Error:', error);
					return false;
				}
			},

			getToken: () => {
				const token = localStorage.getItem('jwt-token');

				setStore({ seInicio: true })
				return !!token;
			},

			//getRol: () => {
			//const rol = localStorage.getItem("user_rol")

			//},
			logout: () => {
				localStorage.clear();
				setStore({ seInicio: false })
			},

			GetUsuarios: async () => {
				try {
					const response = await fetch("https://vigilant-invention-7vv6g76ww4543x9xg-3001.app.github.dev/users", {
						method: 'GET'
					})
					if (response.ok) {
						const data = await response.json();
						setStore({ usuarios: data })
					}

				} catch (error) {
					console.log('Error:', error);
				}
			},
			//`/perfilusuario/${usuarioID}`
			GetUsuarioUnico: async (id) => {
				try {
					const response = await fetch(`https://vigilant-invention-7vv6g76ww4543x9xg-3001.app.github.dev/Usuarios/${id}`, {
						method: 'GET'
					})
					if (response.ok) {
						const data = await response.json();
						console.log(data)
						return setStore({ usuarioUnico: data })
					}
				} catch (error) {
					console.log('Error:', error);
				}
			},

			GetEntrenadorUnico: async (id) => {
				try {
					const response = await fetch(`https://vigilant-invention-7vv6g76ww4543x9xg-3001.app.github.dev/listaentrenadores/${id}`, {
						method: 'GET'
					})
					if (response.ok) {
						const data = await response.json();
						console.log(data)
						return setStore({ usuarioUnico: data })
					}
				} catch (error) {
					console.log('Error:', error);
				}
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			videosEntrenador: () => {
				//post al DB del entrenador, que actualize la lista de videos
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},


			// para lista de entrenadores 
			obtenerListaEntrenadores: async () => {
				try {
					const response = await fetch('https://vigilant-invention-7vv6g76ww4543x9xg-3001.app.github.dev/listaentrenadores');
					if (!response.ok) {
						throw new Error('Error al obtener la lista de entrenadores');
					}
					const data = await response.json();
					setStore({ entrenadores: data }); // Actualiza el estado con los datos de los entrenadores
					return data;  // Retorna los datos de los entrenadores
				} catch (error) {
					console.error('Error al obtener la lista de entrenadores:', error);
					throw error;
				}
			},

			obtenerPerfilEntrenador: async (entrenador_id) => {
				try {
					const response = await fetch(`https://vigilant-invention-7vv6g76ww4543x9xg-3001.app.github.dev/listaentrenadores/${entrenador_id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json',
						},
					});
					return response;
				} catch (error) {
					console.error('Error al obtener el perfil del entrenador:', error);
					throw error;
				}
			},

			RecuperarContraseña: async (email) => {
                try {
                    const response = await fetch('https://glowing-spork-jj94vv5pq7p2ppw7-3001.app.github.dev/solicitud', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: email })
                    });

                    if (!response.ok) {
						console.log(response)
                        console.error('Error al enviar datos');
                        throw new Error('Error al enviar datos');
						return false
                    }

                    const data = await response.json();
                    console.log('Correo de recuperación enviado:', data);
					return true
                } catch (error) {
                    console.error('Error:', error);
                }
            },

			ModificarContraseña: async (password, user_uuid) => {
                try {
                    const response = await fetch('https://glowing-spork-jj94vv5pq7p2ppw7-3001.app.github.dev/reset-password/', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            //'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ password, user_uuid })
                    });

                    if (!response.ok) {
                        console.error('Error al enviar datos');
                        throw new Error('Error al enviar datos');
						return false
                    }

                    const data = await response.json();
                    console.log('Contraseña restablecida:', data);
					return true
                } catch (error) {
                    console.error('Error:', error);
					return false
                }
            },
		}
	};
};

export default getState;
