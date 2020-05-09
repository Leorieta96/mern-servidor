const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {

    // Revisar si hay errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        // crearproyecto
        const proyecto = new Proyecto(req.body);

        proyecto.creador = req.usuario.id;
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');        
    }
}

//obtiene los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1})
        res.json({proyectos});
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}

// actualiza un proyecto 
exports.actualizarProyecto = async (req, res) => {
    // Revisar si hay errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array() });
    }

    //extraer la infoemacion de proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        //revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        //si existe
        if(!proyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado'});
        }
        //creador del proyecto
        if( proyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'})
        }

        //actualizar
        proyecto = await Proyecto.findOneAndUpdate({_id: req.params.id }, { $set: nuevoProyecto}, { new: true });

        res.json({proyecto});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
        
    }
}

exports.eliminarProyecto = async(req, res) => {
    try {
        //revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        //si existe
        if(!proyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado'});
        }
        //creador del proyecto
        if( proyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'})
        }

        // eliminar
        await Proyecto.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: 'proyecto eliminado'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}