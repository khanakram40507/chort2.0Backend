require("dotenv").config();
const app=require("./src/app");
const mongoose = require("mongoose");
const connecttoDb = require("./src/config/datadase");



connecttoDb()   

app.listen(3000,()=>{
    console.log("server is running ")
})