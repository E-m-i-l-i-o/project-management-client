// src/components/AddProject.js

import { useState } from "react";
import axios from "axios";
import projectsService from "../services/projects.service";

const API_URL = "http://localhost:5005";

function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {                          // <== ADD
    e.preventDefault();
 
    const requestBody = { title, description };
    
// Get the token from the localStorage
const storedToken = localStorage.getItem('authToken');
 
// Send the token through the request "Authorization" Headers
                                           ////////////////////////////////
 projectsService.createProject(requestBody)//// !!!WE GUESSED THIS!!! organizing HTTP requests 
                                           ////////////////////////////////
  .then((response) => {
  // Reset the state
  setTitle("");
  setDescription("");
  props.refreshProjects();
})
  .catch((error) => console.log(error));
};


  return (
    <div className="AddProject">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}>          {/*  <== UPDATE   */}
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProject;
