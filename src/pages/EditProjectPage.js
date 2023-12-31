// src/pages/EditProjectPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT 
import projectsService from "../services/projects.service";

const API_URL = "http://localhost:5005";

function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

   // Get the URL parameter `:projectId` 
   const { projectId } = useParams(); 
   const navigate = useNavigate();  


 // This effect will run after the initial render and each time
 // the projectId coming from the URL parameter `projectId` changes
  
  useEffect(() => {                                  
    // axios
    //   .get(`${API_URL}/api/projects/${projectId}`)
                                             ////////////////////////////////
                                           //// !!!WE GUESSED THIS!!! organizing HTTP requests 
                                          ////////////////////////////////
    projectsService.getProject(projectId)

      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);

  const handleFormSubmit = (e) => {                    
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description };
 
    // Make a PUT request to update the project
    // axios
    //   .put(`${API_URL}/api/projects/${projectId}`, requestBody)


      // PUT /api/projects/:id
                                            ////////////////////////////////
                                           //// !!!WE GUESSED THIS!!! organizing HTTP requests 
                                          ////////////////////////////////
      projectsService.updateProject(projectId, requestBody)
                                                               
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/projects/${projectId}`)
      });
  };

  const deleteProject = () => {                    
    // Make a DELETE request to delete the project
    // axios
    //   .delete(`${API_URL}/api/projects/${projectId}`)

                                          ////////////////////////////////
                                           //// !!!WE GUESSED THIS!!! organizing HTTP requests 
                                          ////////////////////////////////
    projectsService.deleteProject(projectId)    
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>      {/*  <== UPDATE  */}

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
      <button onClick={deleteProject}>Delete Project</button>

    </div>
  );
}

export default EditProjectPage;
