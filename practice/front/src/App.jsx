import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [note, setNote] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setNote([...note, formData]);

    setFormData({
      title: "",
      description: "",
    });
  }

  return (
    <div className="container">
      <div>
        <form className="note-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />

          <button type="submit">Submit</button>
        </form>

        <div className="notes-container">
          {note.map((item, index) => (
            <div className="note-card" key={index}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;