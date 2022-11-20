
export default class Usuario{
    constructor(id, nombre, correo, telefono, contrasena, rol){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.contrasena = contrasena;
        this.rol = rol;
        this.codigo_artefacto = null;
    }
    get Id(){
        return this.Id;
    }
}