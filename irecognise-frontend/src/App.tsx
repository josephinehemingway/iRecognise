import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blacklist from "./pages/Blacklist";
import Streams from "./pages/Streams";
import Uploads from "./pages/Uploads";
import BlacklistProfile from "./pages/Blacklist/BlacklistProfile";
import NewProfile from "./pages/Blacklist/NewProfile";
import Login from "./pages/Login";
import 'antd/dist/antd.min.css';
import WithoutNav from "./components/NavBar/WithoutNav";
import WithNav from "./components/NavBar/WithNav";

function App() {
  return (
    <Router>
        <Routes>
            <Route element={<WithoutNav />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<WithNav />}>
                <Route path="/home" element={<Home />} />
                <Route path="/uploads/:videoid" element={<Uploads />} />
                <Route path="/streams/:streamid" element={<Streams/>} />
                <Route path="/blacklist" element={<Blacklist />} />
                <Route path="/blacklist/:id" element={<BlacklistProfile />} />
                <Route path="/blacklist/new" element={<NewProfile />} />
            </Route>
        </Routes>
    </Router>
  );
}

export default App;
