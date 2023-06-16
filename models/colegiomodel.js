const {Schema, model} = require ('mongoose')

const ColegioSchema = Schema({
    direccion: {
        type: String,
        required: [true, 'La dirección es requerida'],
    },
    latitud: {
        type: Number,
        required: [true, 'La latitud es requerida'],
        min: [6.14, 'La latitud mínima permitida es 6.14'],
        max: [6.200, 'La latitud máxima permitida es 6.200'],
    },
    longitud: {
        type: Number,
        required: [true, 'La longitud es obligatoria'],
        min: [-75.50, 'La longitud mínima permitida es -75.50'],
        max: [-75.43, 'La longitud máxima permitida es -75.43'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
    },
    fechaReporte: {
        type: Date,
        required: [true, 'La fecha es requerida'],
        default: Date.now,
    },
});

module.exports = model('Colegio', ColegioSchema)