import { video } from "@cloudinary/url-gen/qualifiers/source";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			seInicio: null,
			rol: null,
			usuarios: [],
			id: [],
			usuarioUnico: [],
			entrenadores: [],
			clientes: [],
			rutinas: [],
			dieta: [],
			videos: [],
			currentUser: {},
            messages: [],

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

			HandleRegistro: async ({ email, password, rol, nombre }) => {
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
						console.log('Datos guardados correctamente:');
						localStorage.setItem("jwt-token", data.token);
						localStorage.setItem("user_rol", data.user_rol);
						localStorage.setItem("user_id", data.id)
						setStore({ id: data.id })
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
						return setStore({ usuarioUnico: data })
					}
				} catch (error) {
					console.log('Error:', error);
				}
			},

			EditarUsuario2: async (id, updatedData) => {
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
			GetEntrenadorUnico: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/${id}`, {
						method: 'GET'
					})
					if (response.ok) {
						const data = await response.json();
						
						return setStore({ usuarioUnico: data })
					}
				} catch (error) {
					console.log('Error:', error);
				}
			},


			EditarFotos: async (id, secureUrl, token) => { // solicita token para que nadie pueda
				try {
					
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ foto: secureUrl })
					});
					const data = await response.json();
					console.log("Respuesta del servidor:");

				} catch (error) {
					console.error("Error updating user data:", error);
				}
			},

			EditarUsuario: async (id, updatedData, token) => {
				try {
					console.log("Datos actualizados:", updatedData);
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(updatedData)
					});
					const data = await response.json();
					console.log("Respuesta del servidor:", data);
					setStore({ usuarioUnico: data });
				} catch (error) {
					console.error("Error updating user data:", error);
				}
			},


			contratarEntrenador: (entrenador_id, usuario_id, seleccionarPlan,) => {
				return fetch(`${process.env.BACKEND_URL}/contratar`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						entrenador_id: entrenador_id,
						usuario_id: usuario_id,
						plan_entrenamiento: seleccionarPlan,
					})
				})
					.then(response => response.json())
					.then(data => {
						if (data.error) {
							throw new Error(data.error);
						}
						return data;
					})
					.catch(error => {
						console.error("Error:", error);
						return { error: error.message };
					});
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
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores`);
					if (!response.ok) {
						throw new Error('Error al obtener la lista de entrenadores');
					}
					const data = await response.json();
					setStore({ entrenadores: data.entrenadores }); // Actualiza el estado con los datos de los entrenadores
					return true;  // Retorna los datos de los entrenadores
				} catch (error) {
					console.error('Error al obtener la lista de entrenadores:', error);
					throw error;
				}
			},

			obtenerListaClientes: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/${id}/clientes`);
					if (!response.ok) {
						throw new Error("Error al obtener la lista de clientes");
					}
					const data = await response.json();
					return data;  // Retorna los datos de los clientes
				} catch (error) {
					console.error("Error al obtener la lista de clientes", error);
					throw error;
				}
			},

			obtenerDetalleCliente: async (cliente_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}`);
					if (!response.ok) {
						throw new Error('Error al obtener los detalles del cliente');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error('Error al obtener los detalles del cliente:', error);
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
					}

					const data = await response.json();
					console.log('Correo de recuperación enviado:', data);
					return true
				} catch (error) {
					console.error('Error:', error);
				}
			},

			ModificarContraseña: async (password, user_uuid) => {
				console.log(password, "contraseña", user_uuid, "userID")
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/reset-password`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							//'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({ password: password, user_uuid: user_uuid })
						
					});

					if (!response.ok) {
						console.error('Error al enviar datos');
						throw new Error('Error al enviar datos');
					}

					const data = await response.json();
					console.log('Contraseña restablecida:');
					return true
				} catch (error) {
					console.error('Error:', error);
					return false
				}
			},


			// RUTINA ver como cliente
			obtenerRutinaCliente: async (usuario_id) => {
				try {
					const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clienteasignado/${usuario_id}/rutina`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						}
					});
					const data = await response.json();
					console.log("Respuesta obtenerRutinaCliente:", data);
					if (response.ok) {
						return { success: true, rutina: data.rutina };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.log("Error al obtener la rutina del cliente:", error);
					return { success: false, error: "Error de red al obtener la rutina del cliente" };
				}
			},



			// AQUI OBTIENE LA DIETA EL CLIENTE
			obtenerDietaCliente: async (usuario_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clienteasignado/${usuario_id}/dieta`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						}
					});
					const data = await response.json();
					console.log("Respuesta obtenerDietaCliente:");
					if (response.ok) {
						return { success: true, dieta: data.dieta };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.log("Error al obtener la dieta del cliente:", error);
					return { success: false, error: "Error de red al obtener la dieta del cliente" };
				}
			},

			// ENTRENADOR DIETA ver, crear, modificar, eliminar esto es del entrenador
			obtenerDieta: async (cliente_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/dieta`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						}
					});
					const data = await response.json();
					console.log("Respuesta obtenerDieta:");
					if (response.ok) {
						return { success: true, dieta: data.dieta };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.error("Error al obtener la dieta:", error);
					return { success: false, error: "Error de red al obtener la dieta" };
				}
			},

			crearDieta: async (cliente_id, dieta) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/dieta`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ dieta })
					});
					const data = await response.json();
					if (response.ok) {
						return { success: true, message: data.message };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.error("Error al crear la dieta:", error);
					return { success: false, error: "Error de red al crear la dieta" };
				}
			},

			actualizarDieta: async (cliente_id, dieta) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/dieta`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ dieta })
					});
					const data = await response.json();
					if (response.ok) {
						return { success: true, message: data.message };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.error("Error al actualizar la dieta:", error);
					return { success: false, error: "Error de red al actualizar la dieta" };
				}
			},

			eliminarDieta: async (cliente_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/dieta`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						}
					});
					const data = await response.json();
					if (response.ok) {
						return { success: true, message: data.message };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.error("Error al eliminar la dieta:", error);
					return { success: false, error: "Error de red al eliminar la dieta" };
				}
			},
			


			// RUTINAver, crear, modificar, eliminar esto es del entrenador
			obtenerRutina: async (cliente_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/rutina`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						}
					});
					const data = await response.json();
					console.log("Respuesta obtenerRutina:");
					if (response.ok) {
						return { success: true, rutina: data.rutina };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.error("Error al obtener la rutina:", error);
					return { success: false, error: "Error de red al obtener la rutina" };
				}
			},

			crearRutina: async (cliente_id, rutina) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/rutina`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ rutina })
					});
					const data = await response.json();
					if (response.ok) {
						return { success: true, message: data.message };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.error("Error al crear la rutina:", error);
					return { success: false, error: "Error de red al crear la rutina" };
				}
			},

			actualizarRutina: async (cliente_id, rutina) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/rutina`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ rutina })
					});
					const data = await response.json();
					if (response.ok) {
						return { success: true, message: data.message };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.error("Error al actualizar la rutina:", error);
					return { success: false, error: "Error de red al actualizar la rutina" };
				}
			},

			eliminarRutina: async (cliente_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/rutina`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						}
					});
					const data = await response.json();
					if (response.ok) {
						return { success: true, message: data.message };
					} else {
						return { success: false, error: data.error };
					}
				} catch (error) {
					console.error("Error al eliminar la dieta:", error);
					return { success: false, error: "Error de red al eliminar la rutina" };
				}
			},


			
			Videos :async (id, secureUrl, token, titulo) => { // solicita token para que nadie pueda
					try {
						const response = await fetch(`${process.env.BACKEND_URL}/agregarVideo/${id}`, {
							method: 'POST',
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
							body: JSON.stringify({ url: secureUrl, titulo : titulo})
						});
						const data = await response.json();
						console.log("Respuesta del servidor:");
					} catch (error) {
						console.error("Error updating user data:", error);
					}
				},

			ObtenerVideos :async (token) => { // solicita token para que nadie pueda
					try {
						const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/videos`, {
							method: 'GET',
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},	
						});
						const data = await response.json();
						setStore({videos : data.entrenadores})
					} catch (error) {
						console.error("Error updating user data:", error);
					}
				},

		}
	};
};

export default getState;
