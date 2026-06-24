import React from 'react'
import {useState} from "react"
import axios from "axios"
import { useEffect } from 'react'

const App = () => {

  const [notes,setnotes]=useState([
  {
  
  }
])


//^fetching note

function fetchNotes(){
axios.get("http://localhost:3000/api/notes")
.then((res)=>{
  setnotes(res.data.note)
})
.catch((err)=>{
  console.log(err)
})
}
useEffect(()=>{
  fetchNotes()
},[])


function handleSubmit(e){
  e.preventDefault();
  const{title,description}=e.target.elements;
  
  axios.post("http://localhost:3000/api/notes",{
    title:title.value,description:description.value
  })
  .then((res) => {
  console.log(res.data);
  fetchNotes();
})
  .catch((err)=>{
    console.log(err)
  })
}

function handleDelete(id){
  axios.delete(`http://localhost:3000/api/notes/${id}`)
  .then((res)=>{
    console.log(res.data);
    fetchNotes();
  })
  .catch((err)=>{
    console.log(err)
  })
}



  return (
    <div className='app'>

      <div className="form-container">
        <form action="" onSubmit={handleSubmit}>
          <input name='title' type="text" placeholder='title' />
          <input name='description' type="text" placeholder='description' />
          <button type='submit'>Create Note</button>
        </form>
      </div>

      <div className="NoteContainer">
        {
        notes.map((note,index)=> {
          return(
            <div className="note" key={index}>
              <h2>{note.title}</h2>
              <p>{note.description}</p>
              <button onClick={() => {
                // Handle button click
              }}>delete</button>
            </div>
          )
        })
      }
      </div>
      
    </div>
  )
}

export default App
