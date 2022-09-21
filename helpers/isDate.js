const moment = require('moment');//moment es una libreria que nos permite trabajar con fechas, 

const isDate = ( value ) => { 
     
    if ( !value ) {
        return false;
    }
    
    const fecha = moment( value );//moment nos inidca si es una fecha correcta o no 
    if ( fecha.isValid() ) {//isValid es una funcion de moement 
        return true;
    }else {
        return true;
    }

}


module.exports = {
    isDate
}

