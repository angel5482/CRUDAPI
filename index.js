//Importar bibliotecaas cargar el modulo
const express = require('express');

//Importar el modulo de path
const path = require('path')

//Creacion de la instancia
const app = express();

//Definr el puerto escuchar spñlicitudes
const port = 3000;

//creacion de las rutas
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
});

//Iniciar el servidor
app.listen(port,()=>{
    console.log(`Servidor ejecutandose en http://localhost:${port}`)
})
