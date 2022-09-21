const { validationResult } = require('express-validator');

//comprueba si el req trae errores, los cuales fueron capturados en el midelware check() que se en cuentra en la ruta Post
const muestraErroresEncontrados = ( req, res, next ) => {

    const errores = validationResult( req );
    if ( !errores.isEmpty() ) {
        return res.status(400).json( errores );
    } 
    
    next();
} 

module.exports = {
    muestraErroresEncontrados
}


