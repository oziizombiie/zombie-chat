class Usuarios{
	constructor(){
		this.personas = []
	}
	agregarPersona(id,nombre, apellido ,sala){
		let persona =  {id,nombre,apellido,sala}
		//inserto a la persona dentro del arreglo personas
		this.personas.push(persona)

		return this.personas;
	}
	//obtener una persona que coincida con el ID
	getPersona(id)
	{
		let persona = this.personas.filter( persona =>  persona.id === id)[0];
		//si encuentra una persona con el ID devolvera un objeto sino, devolvera undefined
		return persona;
	}

	getPersonas(){
		return this.personas;
	}

	getPersonasPorSala(sala){
		let personasEnSala = this.personas.filter( personasEnSala => personasEnSala.sala === sala)
		return personasEnSala;
	}

	borrarPersona(id){
		let personaBorrada = this.getPersona(id);

		this.personas = this.personas.filter(persona => persona.id != id)

		return personaBorrada;
	}

}

module.exports ={
	Usuarios
}