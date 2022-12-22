import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Blacklist from "./pages/Blacklist";
import Streams from "./pages/Streams";
import Uploads from "./pages/Uploads";
import BlacklistProfile from "./pages/Blacklist/BlacklistProfile";
import NewProfile from "./pages/Blacklist/NewProfile";
import 'antd/dist/antd.min.css';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uploads/:videoid" element={<Uploads />} />
            <Route path="/streams/:streamid" element={<Streams/>} />
            <Route path="/blacklist" element={<Blacklist />} />
            <Route path="/blacklist/:id" element={<BlacklistProfile />} />
            <Route path="/blacklist/new" element={<NewProfile />} />

        </Routes>
    </Router>
  );
}

export default App;
