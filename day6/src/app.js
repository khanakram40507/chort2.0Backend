const express=require('express')
const app=express();
app.use(express.json());

const notes=[];



app.get("/",(req,res)=>{
    res.send("hello world");
})


app.post("/notes", (req,res)=>{
        res.send(req.body);
})

app.get("/notes", (req,res)=>{
        
})
module.exports=app