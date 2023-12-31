const { response } = require('express')

const Colegio = require('../models/colegiomodel')

const colegioGet = async(req, res = response)=>{

   const colegios = await Colegio.find()

   res.json({
    colegios
   })
}

const colegioPost = async (req, res = response) => {
    const { direccion, latitud,longitud,descripcion,fechareporte } = req.body;
    let mensaje = "";
    console.log(req.body);
    const fecha=new Date()

    try {
        const colegio = new Colegio({
            direccion: direccion,
            latitud:latitud,
            longitud:longitud,
            descripcion:descripcion,
            fechareporte:fecha

        });
        await colegio.save();
        mensaje = "La inserción del colegio se hizo correctamente";
    } catch (error) {
        if (error.name === "ValidationError") {
            mensaje = Object.values(error.errors).map((val) => val.message);
        } else if (error.name === "MongoError" || error.code === 11000) {
            mensaje = "El nombre de la categoría ya existe";
        } else {
            console.error("Ocurrió un error al guardar el usuario:", error.message);
            mensaje = "Ocurrió un error al guardar el usuario";
        }
    }
    res.json({
        msg: mensaje
    });
};


const colegioPut = async (req, res = response) => {
    let id = null;
    if (req.query != null && req.query.id != null) {
    id = req.query.id;
    }
    const { direccion, latitud, longitud, descripcion} = req.body;
    let mensaje = "";
    
    try {
    if (id != null) {
    
    const update = { direccion: direccion , latitud: latitud, longitud: longitud, descripcion: descripcion};
    
    const colegio = await Colegio.findByIdAndUpdate(
    id,
    update,
    {new: true, runValidators: true}
    );
    
    if (colegio) {
    mensaje = "La modificación se efectuó correctamente";
    } else {
    mensaje = "El reporte no fue encontrado";
    }
    }
    else {
    mensaje = "Ingrese un id";
    }
    
    } catch (error) {
    console.error(error);
    mensaje = error.message;
    }
    
    res.json({
    msg: mensaje,
    });
    };
  
const colegioDelete = async(req,res = response) => {
  
    const {_id} = req.body
    let mensaje = ''

    try {
        const colegio = await Colegio.deleteOne({_id:_id}) //Buscar por el nombre y eliminar el registro
        mensaje = 'La eliminación se realizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas en la eliminación'
    }

    res.json({
        msg: mensaje
    })
}
module.exports={
    colegioGet,
    colegioPost,
    colegioPut,
    colegioDelete
}