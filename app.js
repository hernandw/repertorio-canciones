const express = require('express');
const fs = require('fs');




const app = express();
const PORT = process.env.PORT || 3000

//middlewares
app.use(express.json())



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//consultar canciones
app.get('/canciones', (req, res) => {
   const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
   res.send(canciones);
 } )

 //crear cancion
 app.post('/canciones', (req, res) => {
   const cancion = req.body;
   const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
   canciones.push(cancion);
   fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
   res.send('cancion aagregada');
 } )


 //editar cancion
 app.put('/canciones/:id', (req, res) => {
   const id = req.params.id;
   const cancion = req.body;
   const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
   const index = canciones.findIndex(cancion => cancion.id == id);
   canciones[index] = cancion;
   fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
   res.send('cancion editada');
 } )

 //eliminar cancion
 app.delete('/canciones/:id', (req, res) => {
   const id = req.params.id;
   const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
   const index = canciones.findIndex(cancion => cancion.id == id);
   canciones.splice(index, 1);
   fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
   res.send('cancion eliminada');
 } )

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
