const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// api/auth
router.post('/',
    authController.autenticarUsuario
);

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;