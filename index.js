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
const PORT = process.env.PORT || 4000;

// importar rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
});