const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// crea una nueva tarea
exports.crearTarea = async (req, res) => {
    // Revisar si hay errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array() });
    }
    
    //extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;
    try {
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado '});
        }

        if( existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'})
        }

        //Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerTareas = async (req, res) => {

    try {
        //extraer el proyecto y comprobar si existe
        const { proyecto } = req.query; // viene en params

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado '});
        }

        if( existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'})
        }
    
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
        res.json({tareas});
    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarTarea = async (req, res) => {
    try {
        //extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;

        //si la tarea existe
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).json({ msg: 'No existe la tarea'})
        }

        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //revisar si el proyecto pertenece al usuario
        if( existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'})
        }
        
        // creando objeto con nueva informacion
        const nuevaTarea = {};

        if(nombre) nuevaTarea.nombre = nombre;
        
        if(estado !== undefined ) nuevaTarea.estado = estado;

        tarea = await Tarea.findOneAndUpdate({_id : req.params.id }, nuevaTarea, { new: true });
        
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarTarea = async (req, res) => {
    try {
        //extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;

        //si la tarea existe
        let tareaExiste = await Tarea.findById(req.params.id);

        console.log(proyecto);
        
        if(!tareaExiste){
            return res.status(404).json({ msg: 'No existe la tarea'})
        }

        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //revisar si el proyecto pertenece al usuario
        if( existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'})
        }

        //eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});

        res.json({ msg: 'Tarea eliminada' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}