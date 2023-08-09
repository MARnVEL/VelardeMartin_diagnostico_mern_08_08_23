import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

//* ###################- IMPORTING CONNECTION TO DATABASE -################

import { connectDB } from './src/database/connection.database.js';

//* ###########################- CONFIGS -#############################

dotenv.config();

const port = process.env.PORT || 3000;

//* ##########################- STARTING THE APP -########################
// Ejecuto la librería de express
const expressApp = express();

//* ######################- CONNECTION TO DATABASE -##################
try {
    connectDB(); // Ejecuto la función connectDB para HACER LA CONEXIÓN A LA BASE DE DATOS.
} catch (error) {
    console.log('Error trying to connect to database', error);
}

//* ###################- ROUTES -######################################
//* Importo todos los endpoints correspondientes a las tareas
import { TaskRouter } from './src/routes/tasks.routes.js';

//* Importo todos los endpoints correspondientes al inicio de sesión
// const auth = require('./src/routes/auth.routes');

//* #############################- MIDDLEWARES -##################################################

expressApp.use(morgan('dev'));
expressApp.use(express.json());
expressApp.use(
    cors({
        origin: 'http://localhost:5173'
        // methods: {}
    })
);

expressApp.get('/api', (req, res) => {
    return res.status(200).send('Hola');
});

expressApp.use('/api/tasks/', TaskRouter);
// expressApp.use(auth);

//! ------------------------- DIRECTORIO DE ARCHIVOS ESTÁTICOS -------------------------------------
//! La siguiente línea establece que el servidor tome como referencia por defecto todo lo que está dentro de la carpeta públic. Recibe como parámetro una carpeta donde están todos los ficheros que quiero enviar al cliente.
expressApp.use(express.static('public'));
// expressApp.use(express.static(path.join(__dirname, 'public')));

//* ###############################    RUTAS Y CONTROLADORES    ############################

//* #############################- STARTING SERVER -################################################
expressApp.listen(port, () => {
    console.log(`Server running and listening on port: ${port}. Go to: http://localhost:${port}/`);
});
