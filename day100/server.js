require("dotenv").config()
const mongoose=require("mongoose")
const app=require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB()

app.listen(3000,()=>{
    console.log("server runing in 3000 port");
    
})