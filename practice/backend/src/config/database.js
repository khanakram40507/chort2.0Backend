const mongoose=require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connect To db")
    })
}


module.exports=connectToDb;