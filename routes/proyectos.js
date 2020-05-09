const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').notEmpty()
    ],
    proyectoController.crearProyecto
);

router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').notEmpty()
    ],
    proyectoController.actualizarProyecto
)

//eliminar proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)

module.exports = router;