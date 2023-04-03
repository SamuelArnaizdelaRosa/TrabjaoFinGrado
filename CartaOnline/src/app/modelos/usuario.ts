export class Usuario {
    public idUsuario: number;
    public nombreUsuario: string;
    public nombre: string;
    public apellidos: string;
    public email: string;
    public pass: string;
    public token: string;

    constructor(idUsuario: number, nombreUsuario: string, nombre: string, apellidos: string, email: string, pass: string, token: string) {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.pass = pass;
        this.token = token;
    }
}
