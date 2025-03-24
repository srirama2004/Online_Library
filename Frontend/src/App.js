import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.js";
import ProfilePage from "./Pages/ProfilePage.js";
import BookDescription from "./Pages/BookDescription.js";
import Signin from "./Pages/SignIn.js"
import Signup from "./Pages/Signup.js"
import BookViewer from "./Pages/BookViewer.js";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/book/:id" element={<BookDescription />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bookviewer" element={<BookViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
