const mongoose=require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(
        ()=>{
            console.log("connected to db");
            
        }
    )
    .catch(
        ()=>{
            console.error("fail toconnect");
            
        }
    )
}

module.exports=connectToDB;