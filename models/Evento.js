const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
   user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

//Este metodo sobreescrito remueve las propiedades __v, etc del body de manera global 
EventoSchema.methods.toJSON = function() {//es una funcion normal ya que en las funcionas flecha el this apunta a lo que está afuera, en este caso el this hace referencia la instancia creada
    const { __v, _id, ...object } = this.toObject();//este this hace referencia a la instancia creada del objeto que es EventoSchema
    object.id = _id;
    return object;
}

module.exports = model( 'Evento', EventoSchema );