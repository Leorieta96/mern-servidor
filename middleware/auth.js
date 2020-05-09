const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //leer el token del header
    const token = req.header('x-auth-token');
    
    // revisar si no hay token
    if(!token){
        return res.status(401).json({ msg:'No hay token, permiso no valido' });
    }
    //validar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);

        console.log('---------------------------------------------------------------');
        console.log(cifrado);
        console.log('---------------------------------------------------------------');

        req.usuario = cifrado.usuario; //guardo los datos del usuario autenticado en req
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido'});
    }
}