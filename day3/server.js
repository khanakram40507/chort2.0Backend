const express= require('express');
const app= express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World from Express!');
} );

app.post('/note',(req,res)=>{
    console.log(req.body);
    res.send('Note created successfully!');

} );

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});