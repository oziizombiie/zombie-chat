const { io } = require('../server')
const { Usuarios } = require('../clases/usuarios')
const { crearMensaje } = require('../utilidades/utilidades')
const usuarios = new Usuarios();

	//io.on 'connection' crea la conexion, el parametro client obtiene la informacion del 
	//equipo con el cual se esta conectando
	//on es para escuchar 
	io.on('connection', (client) =>{
		client.on('entrarChat', (data, callback)=>{
			//este log me muestra los datos que estoy enviando a traves de usuario
			//console.log(data)
			if (!data.nombre || !data.apellido || !data.sala)
			{
				callback({
					error:true,
					mensaje:'No se ha encontrado nombre o apellido o sala'
				})
			}
			//instruccion para redirigir al usuario a la sala correspondiente
			client.join(data.sala);
			//agregar la sala cuando se agrega un usuario
			let personas = usuarios.agregarPersona(client.id, data.nombre, data.apellido, data.sala)
			//este emite a todos los canales/salas quien se ha conectado
			//client.broadcast.emit('listaPersonas', usuarios.getPersonas())
			//al asignar to al broadcast delimitamos a que sala mandaremos el mensaje
			client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala))

			callback(usuarios.getPersonasPorSala(data.sala))
		});

		//escucha el momento en que se desconecta y elimina ese id
		client.on('disconnect', () =>{
			//actualiza el arreglo de los usuarios conectados
			let personaBorrada = usuarios.borrarPersona(client.id);
			//emite el mensaje sobre quien se desconecto a todos los usuarios conectados
			//client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`))
			//emite mensaje sobre quien se desconecto filtrado por salas
			client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`))
			client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala))

		})
		client.broadcast.emit('listaPersonas', usuarios.getPersonas())

		//Envio de mensaje de usuario a todos
		client.on('crearMensaje', (data) => {
			let persona = usuarios.getPersona(client.id)
			//crea el mensaje que se enviara a todos
			let mensaje = crearMensaje(persona.nombre, data.mensaje);
			//Esta parte emite el mensaje a todos
			//client.broadcast.emit('crearMensaje', mensaje)
			//este los filtra por salas
			client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
		})
		//Mensajes privados
		client.on('mensajePrivado', (data) => {
			let persona = usuarios.getPersona(client.id)
			client.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
			console.log(persona)
		})
	})
	







	/*
		client.emit('enviarMensaje', {usuario: 'Admin', mensaje:'Bienvenido a esta App.'})
		//Manda un mensaje cuando el usuario (client) se desconecta
		client.on('disconnect', () =>{
			console.log('Usuario desconectado');
		})
		//escuchar el cliente
		//obtenemos el mensaje que  este dentro del parametro enviarMensaje
		client.on('enviarMensaje', (data,confirmacion) => {
			
			console.log(data);

			client.broadcast.emit('enviarMensaje', data)
			//vemos dentro del mensaje si contiene un usuario para disparar el callback
			/*
			if( mensaje.usuario)
				{
					confirmacion({
						respuesta: 'Todo salio bien'
					}); 
				}
			//si no hay usuario respondemos con un error|
			else{
				confirmacion({
					respuesta:'Todo salio mal'
				})
			}
		})
	*/
