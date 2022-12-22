import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Blacklist from "./pages/Blacklist";
import Streams from "./pages/Streams";
import BlacklistProfile from "./pages/Blacklist/BlacklistProfile";
import 'antd/dist/antd.min.css';
import NewProfile from "./pages/Blacklist/NewProfile";

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/uploads" element={<Uploads />} />*/}
            <Route path="/streams/:streamid" element={<Streams/>} />
            <Route path="/blacklist" element={<Blacklist />} />
            <Route path="/blacklist/:id" element={<BlacklistProfile />} />
            <Route path="/blacklist/new" element={<NewProfile />} />

        </Routes>
    </Router>
  );
}

export default App;
