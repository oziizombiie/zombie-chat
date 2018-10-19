//se requiere la instancia io de socket.js
var socket = io();

var params = new URLSearchParams(window.location.search)

if (!params.has('nombre') || !params.has('apellido') || !params.has('sala')) 
{	
	window.location = 'index.html';
	throw new Error('El nombre y sala son necesarios');
}
//Los parametros que tomara el servicio para identificar al usuario
//a traves de la URL
var usuario = { nombre: params.get('nombre'),
				apellido: params.get('apellido'),
				sala: params.get('sala')
			}

		socket.on('connect', () => {
			socket.emit('entrarChat', usuario, (resp) =>{
				console.log('Usuarios conectados:', resp)
			} )
		})

		//Cuando se pierde la conexión con el servidor
		socket.on('disconnect', () =>{
			console.log('perdimos conexión con el servidor')
		})
		//Escuchar la información Enviada
		socket.on('crearMensaje', (mensaje) => {
			console.log(mensaje);
		})
		//Escuchar cambios de usuarios
		//Cuando un usuario entra o sale de la sala
		socket.on('listaPersonas', (usuarios) =>{
			//console.log(usuarios)
		})

		socket.on('mensajePrivado',  (mensaje)=>{
			console.log('Mensaje Privado:' ,mensaje)
		})

/*
	//emit es para enviar
	socket.emit('enviarMensaje', {
		usuario: 'Uriel',
		mensaje: 'Hola mundo'
	}, 
	//callback que obtendra la respuesta del servidor
	(respuesta) => {
		console.log('respuesta servidor:', respuesta);
	});
	//escuchar el evento o mensaje
	socket.on('enviarMensaje', (mensaje) => {
		console.log('Servidor: ',mensaje);
	})
*/