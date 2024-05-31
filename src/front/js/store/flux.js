const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
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

			HandleRegistro: async ({email, password, rol}) => {
				try {
				  const response = await fetch('https://opulent-doodle-977rpqgx6j64hp4p9-3001.app.github.dev/registro', {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					  'accept': 'application/json'
					},
					body: JSON.stringify({
					  email: email,
					  password: password,
					  rol : rol === 0 ? true : false
					}),
				  });
		
				  if (response.ok) {
					return true;
				  } else {
					const errorData = await response.json();
					console.log(errorData);
					return false;
				  }
				} catch (error) {
				  console.log('Error:', error);
				  return false;
				}
			  },
			
			HandleInicioSesion: async ({email, password}) =>{
				try {
					const response = await fetch('https://opulent-doodle-977rpqgx6j64hp4p9-3001.app.github.dev/login', {
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
		  
					if (response.ok) {
						
						return true;
					} else {
						const errorData = await response.json();
						console.log(errorData);
						return false;
					}
				  } catch (error) {
					console.log('Error:', error);
					return false;
				  }
			},
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
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
			
		}
	};
};

export default getState;
