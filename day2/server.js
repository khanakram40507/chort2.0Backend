const express=require('express');
const app=express();
app.use(express.json())
app.get("/",()=>{
    res.send("hello ji") 
})
app.post("/notes",(req,res)=>{
    console.log(req.body);
    
})
app.listen(3000,()=>{
    console.log("it runing")
})