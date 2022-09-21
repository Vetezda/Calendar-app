//const Role = require('../models/role');
const Usuario = require('../models/usuario');


/*const rolValidator = async( rol = '' ) => { 
    const existeRol = await Role.findOne( {rol} );
    if ( !existeRol ) {
        throw new Error( `El rol ${rol} no está registrado en la BD` );
    }
}*/

const emailValidator = async ( email = '' ) => {

    const existeCorreo = await Usuario.findOne( {email} );
    if (existeCorreo) {
        throw new Error( `El correo ${email} ya existe` );
    }
}
    
/*const idValidator = async ( id ) => {

    const existeUsuarioConEseId = await Usuario.findById( id );
    if ( !existeUsuarioConEseId ) {
        throw new Error( `El ID ${id} no existe` );
    }
}*/
    

module.exports = {
    //rolValidator,
    emailValidator,
    //idValidator
}