class Usuario{
    constructor(nombre,apellido, email,pass=""){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.pass = pass
    }

    checkPassword(pass){
        if(this.pass == pass){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = Usuario;