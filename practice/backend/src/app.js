const express = require("express");
const app = express();
const noteModels=require("./models/notes.model")

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello Akram");
});


//^post the note 
app.post("/notes/post", async(req, res) => {
    console.log(req.body);
    const {title,description}=req.body;
    const note=await noteModels.create({title,description});


    res.send("notes posted successfully");
});

//^get the notes
app.get("/notes/get",async(req,res)=>{
    const note=await noteModels.find()
    res.send(note);
})

//^delete the notes
app.delete("/notes/:id",async(req,res)=>{
    const id=req.params.id;
    await noteModels.findByIdAndDelete(id);

})

module.exports = app;