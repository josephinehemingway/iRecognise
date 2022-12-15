import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Blacklist from "./pages/Blacklist";
import Streams from "./pages/Streams";
import BlacklistProfile from "./pages/BlacklistProfile";
import 'antd/dist/antd.min.css';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/uploads" element={<Uploads />} />*/}
            <Route path="/streams" element={<Streams locationName={'NTU Arc'} streamName={'CCTV 1'}/>} />
            <Route path="/blacklist" element={<Blacklist />} />
            <Route path="/blacklist/:id" element={<BlacklistProfile />} />
        </Routes>
    </Router>
  );
}

export default App;
