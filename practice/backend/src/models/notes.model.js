const mongoose=require("mongoose");
const noteSchema=new mongoose.Schema({
    title:String,
    description:String
})

const noteModels=mongoose.model("notes",noteSchema);
module.exports=noteModels;