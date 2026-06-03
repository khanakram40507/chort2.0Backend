const mongoose=require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('conect to DB')
    })
    .catch((err)=>{
        console.error("error occur ro connect db ")
    })
}

module.exports=connectToDB