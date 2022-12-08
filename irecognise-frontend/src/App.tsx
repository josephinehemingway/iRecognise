import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Blacklist from "./pages/Blacklist";

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/uploads" element={<Uploads />} />*/}
            {/*<Route path="/streams" element={<Streams />} />*/}
            <Route path="/blacklist" element={<Blacklist />} />
        </Routes>
    </Router>
  );
}

export default App;
