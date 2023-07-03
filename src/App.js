// src/App.js

import "./App.css";
import { Routes, Route } from "react-router-dom"; // <== IMPORT
import Navbar from "./components/Navbar";     // <== IMPORT
import HomePage from "./pages/HomePage";     // <== IMPORT
import ProjectListPage from "./pages/ProjectListPage"; //  <== IMPORT
import ProjectDetailsPage from "./pages/ProjectDetailsPage";      //  <== IMPORT
import EditProjectPage from "./pages/EditProjectPage";
import SignupPage from "./pages/SignupPage";  // <== IMPORT
import LoginPage from "./pages/LoginPage";  // <== IMPORT
import IsPrivate from "./components/IsPrivate";  // <== IMPORT
import IsAnon from "./components/IsAnon";


function App() {
  return (
    <div className="App">
      
     {/* Below: ADD <Navbar>, <Routes> & <Route> */}
      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />

        <Route
          path="/projects"
          element={ <IsPrivate> <ProjectListPage /> </IsPrivate> } />
 
        <Route
          path="/projects/:projectId"
          element={ <IsPrivate> <ProjectDetailsPage /> </IsPrivate> }/>
 
        <Route
          path="/projects/edit/:projectId"
          element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
 

      </Routes>
      
    </div>
  );
}

export default App;
