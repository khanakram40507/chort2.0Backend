const  mongoose = require("mongoose");
const app=require("./src/app");

function connecttoDb(){
    mongoose.connect("mongodb://khanakram40507_db_user:qsoISNW5C1f7MWRn@ac-iytba2c-shard-00-00.3ovbpvo.mongodb.net:27017,ac-iytba2c-shard-00-01.3ovbpvo.mongodb.net:27017,ac-iytba2c-shard-00-02.3ovbpvo.mongodb.net:27017/?ssl=true&replicaSet=atlas-2nlqgm-shard-0&authSource=admin&appName=Cluster0/day6")
        .then(()=>{
            console.log("Connect to Database")
        })
}
connecttoDb()

app.listen(3000,()=>{
    console.log("server is running ")
})