//Importar bibliotecaas cargar el modulo
const express = require('express');

//Importar el modulo de path
const path = require('path')

//Creacion de la instancia
const app = express();

//Definr el puerto escuchar spñlicitudes
const port = 3000;

//Analizador Json
app.use(express.json());

//creacion de las rutas
/*app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
});*/

//Datos de memoria (temporal)
let usuarios = [ ]

//Creacion de ruta POST
app.post('/usuarios', (req,res)=>{
   //Variables de los campos de la base de datos
   const {id, nombre, email}=req.body
   //Agregar elementos al diccionario o arreglo
   usuarios.push({id,nombre,email});
   res.status(201).json({mensaje:'Usuario creado', usuario:{id,nombre,email}});
})

//Creacion de una ruta GET
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Ruta para obtener un usuario nombre
app.get('/usuarios/:email',(req,res)=>{
    const usuario = usuarios.find(u =>u.email == req.params.email);
    //Validar el objeto
    if(usuario){
        //Mostrar la busqeuda completa en formato Json del objeto que trae consigo
        res.json(usuario)
    }else{
        res.status(404).json({mesaje:"Usuario no se encuentra"})
    }
})

//Crear actualizaciones
app.put('/usuarios/:email',(req,res)=>{
    const{id, nombre}= req.body
    const usuario = usuarios.find(u =>u.email == req.params.email);
    if(usuario){
        usuario.id = id || usuario.id;
        usuario.nombre = nombre || usuario.nombre;
        res.json({mensaje:'Se actulizo un usuario', usuario});
    } else{
        res.status(404).json({mesaje:'Usuario no actualizado correctamente'})
    }
})

//Cual es la diferencia entre req y res

// Ruta para eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
    const index = usuarios.findIndex(u => u.id == req.params.id);
    if (index !== -1) {
        const usuarioEliminado = usuarios.splice(index, 1);
        res.json({ mensaje: 'Se eliminó un usuario', usuarioEliminado });
    } else {
        res.status(404).json({ mensaje: 'Usuario no eliminado correctamente' });
    }
});


//Node
//Funcion asincrona
/*async function getPokemon(nameOrId){
    const response = await fetch(https://pokeapi.co/api/v2/pokemon/${nameOrId}
    );
    const pokemon= await response.json();

}*/


//python
/*import request from 'http'
det get poemon(nameOrdId):
    url = f "https://pokeapi.co/api/v2/pokemon/{nameOrId}"
    response =request.get(url)
    pokemon = resoinse.json()*/


//Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});