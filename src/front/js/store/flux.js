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
				return fetch(`${process.env.BACKEND_URL}/contactanos`, {
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
					const response = await fetch(`${process.env.BACKEND_URL}/registro`, {
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
					const response = await fetch(`${process.env.BACKEND_URL}/login`, {
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
					const response = await fetch(`${process.env.BACKEND_URL}/users`, {
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
					const response = await fetch(`${process.env.BACKEND_URL}/Usuarios/${id}`, {
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
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/${id}`, {
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
				console.log (process.env.BACKEND_URL)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores`);
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
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/${entrenador_id}`, {
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

			RecuperarContraseña: async (email) =>{
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/users/solicitud`, {
					  method: "POST",
					  headers: {
						"Content-Type": "application/json",
					  },
					  body: JSON.stringify({email : email}),
					});
					if (response.ok) {
						console.log(response)
					  return true
					} else {
						console.log(response)
					  return false
					}
				  } catch (error) {
					console.log("Error:", error);
					return false
				  }
				},

			ModificarContraseña: async(password) =>{
				try {
					const token = window.location.pathname.split('/').pop(); // Obtener el token de la URL
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/${token}`, {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							password: password
						})
					});
					if (response.ok) {
						alert("Contraseña actualizada exitosamente.");
						// Redireccionar a la página de inicio de sesión o a donde desees
					} else {
						const error = await response.json();
						throw new Error(error.message || 'Hubo un error al procesar tu solicitud.');
					}
				} catch (error) {
					console.log("Error:", error);
					alert(error.message || "Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.");
				}
			}
		}
	};
};

export default getState;
