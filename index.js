const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

//conectar a db
connectDB();

//habilitar cors
app.use(cors());

// habilitar express.json para datos de form
app.use(express.json({ extend: true}));

// puerto de la app
var server_port = process.env.YOUR_PORT || process.env.PORT || 4000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
// const port = process.env.PORT || 4000;

// importar rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//arrancar la app
app.listen(server_port, server_host, () => {
    console.log(`El servidor esta funcionando en el puerto ${server_port}`)
});