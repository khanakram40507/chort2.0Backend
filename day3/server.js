const express= require('express');
const app= express();

app.use(express.json());
const notes = [];

app.get('/',(req,res)=>{
    res.send('Hello World from Express!');
} );

app.post('/note',(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send('Note created successfully!');

} );
app.get('/note',(req,res)=>{
    res.send(notes);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});