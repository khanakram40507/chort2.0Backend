const express= require('express');
const app= express();// it create server.

app.use(express.json());// it is used to parse the incoming request body in JSON format and make it available in req.body.

const notes=[];

app.get('/',(req,res)=>{
    res.send('Hello World from Express!');
} );

app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send('Note created successfully!');
    console.log(notes);
} );

app.get('/notes',(req,res)=>{
    res.send(notes);
});

app.delete('/notes/:id',(req,res)=>{
    delete  notes[req.params.id];
    res.send('Note deleted successfully!');
    console.log(notes);
});
module.exports = app; 