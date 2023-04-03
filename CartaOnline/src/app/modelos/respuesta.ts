export class Respuesta {
    status:string;
    mensaje:string;
    token:string;

    constructor(status:string, mensaje:string,token=""){
        this.status=status;
        this.mensaje = mensaje;
        this.token = token;
    }
}
