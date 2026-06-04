import React from 'react'
import {useState} from "react"
import axios from "axios"

const App = () => {

  const [notes,setnotes]=useState([
  {
  
  }
])

axios.get("http://localhost:3000/api/notes")
.then((res)=>{
  setnotes(res.data.note)
})
.catch((err)=>{
  console.log(err)
})


  return (
    <div className='app'>
      {
        notes.map((note,index)=> {
          return(
            <div className="note" key={index}>
              <h2>{note.title}</h2>
              <p>{note.description}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
