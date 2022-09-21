const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
const { dbConnection } = require('./database/config');



const app = express();

dbConnection();

app.use( cors() );


app.use(  express.json() );

app.use( express.static('public') );

app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );

app.listen( port, () => {
    console.log('Servidor corriendo en puerto 4000');
});