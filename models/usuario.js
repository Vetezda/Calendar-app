const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
});
//Este metodo sobreescrito remueve las propiedades __v y password del body de manera global 
/*UsuarioSchema.methods.toJSON = function() {//es una funcion normal ya que en las funcionas flecha el this apunta a lo que está afuera, en este caso el this hace referencia la instancia creada
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}*/

module.exports = model( 'Usuario', UsuarioSchema );