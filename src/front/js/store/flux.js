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
			rutinas: []
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
						console.log(data)
						return setStore({ usuarioUnico: data })
					}
				} catch (error) {
					console.log('Error:', error);
				}
			},

			EditarUsuario: async (id, updatedData) => {
				try {
					console.log("Datos actualizados:", updatedData);
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
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
				console.log(process.env.BACKEND_URL)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores`);
					if (!response.ok) {
						throw new Error('Error al obtener la lista de entrenadores');
					}
					const data = await response.json();
					console.log(data.entrenadores)
					setStore({ entrenadores: data.entrenadores }); // Actualiza el estado con los datos de los entrenadores
					return data;  // Retorna los datos de los entrenadores
				} catch (error) {
					console.error('Error al obtener la lista de entrenadores:', error);
					throw error;
				}
			},

			obtenerListaClientes: async (id) => {
				console.log(process.env.BACKEND_URL)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/listaentrenadores/${id}/clientes`);
					if (!response.ok) {
						throw new Error("Error al obtener la lista de clientes");
					}
					const data = await response.json();
					console.log(data)
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
					const response = await fetch(`${process.env.BACKEND_URL}/reset-password/`, {
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

			ContratarEntrenador: async (usuarioId, entrenadorId) => {
				try {
					const response = await fetch('https://vigilant-invention-7vv6g76ww4543x9xg-3001.app.github.dev/contratar-entrenador', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json'
						},
						body: JSON.stringify({
							usuario_id: usuarioId,
							entrenador_id: entrenadorId
						}),
					});

					if (response.ok) {
						// Si la contratación es exitosa, obtenemos la respuesta del backend
						const responseData = await response.json();
						// Devolvemos un objeto con el valor booleano y cualquier otro dato que necesites
						return { success: true, message: responseData.message };
					} else {
						const errorData = await response.json();
						console.log(errorData);
						return { success: false, error: errorData.message };
					}
				} catch (error) {
					console.log('Error:', error);
					return { success: false, error: 'Error al enviar la solicitud de contratación.' };
				}
			},





			// para eliminar modificar y crear rutina
			obtenerRutinasCliente: async (cliente_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/rutinas`);
					if (!response.ok) {
						throw new Error("Error al obtener las rutinas del cliente");
					}
					const data = await response.json();
					return data.rutinas;
				} catch (error) {
					console.error("Error al obtener las rutinas del cliente", error);
					throw error;
				}
			},

			crearRutinaCliente: async (cliente_id, rutina) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/rutinas`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ rutina })
					});
					if (!response.ok) {
						throw new Error("Error al crear la rutina del cliente");
					}
					const data = await response.json();
					return data.message;
				} catch (error) {
					console.error("Error al crear la rutina del cliente", error);
					throw error;
				}
			},

			actualizarRutinaCliente: async (cliente_id, rutinaIndex, rutina) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/rutinas/${rutinaIndex}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ rutina })
					});
					if (!response.ok) {
						throw new Error("Error al actualizar la rutina del cliente");
					}
					const data = await response.json();
					return data.message;
				} catch (error) {
					console.error("Error al actualizar la rutina del cliente", error);
					throw error;
				}
			},

			eliminarRutinaCliente: async (cliente_id, rutinaIndex) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/clientes/${cliente_id}/rutinas/${rutinaIndex}`, {
						method: "DELETE"
					});
					if (!response.ok) {
						throw new Error("Error al eliminar la rutina del cliente");
					}
					const data = await response.json();
					return data.message;
				} catch (error) {
					console.error("Error al eliminar la rutina del cliente", error);
					throw error;
				}
			},




		}
	};
};

export default getState;
