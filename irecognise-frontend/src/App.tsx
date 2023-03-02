import React from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Blacklist from "./pages/Blacklist";
import Streams from "./pages/Streams";
import Uploads from "./pages/Uploads";
import BlacklistProfile from "./pages/Blacklist/BlacklistProfile";
import NewProfile from "./pages/Blacklist/NewProfile";
import Login from "./pages/Login/Login";
import "antd/dist/antd.min.css";
import WithoutNav from "./components/NavBar/WithoutNav";
import WithNav from "./components/NavBar/WithNav";
import Register from "./pages/Login/Register";
import Playback from "./pages/Playback";
import PlaybackPlayer from "./pages/PlaybackPlayer";
import UploadsPage from "./pages/Uploads/UploadsPage";

// type Props = {
//     username: string | null,
//     redirectUrl?: string,
//     // children?: JSX.Element,
// }
//
// const ProtectedRoute: React.FC<Props> = ({ username, redirectUrl = '/login'}) => {
//     if (!username) {
//         return <Navigate to={redirectUrl} replace />;
//     }
//
//     return <Outlet />;
// };

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<WithoutNav />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<WithNav />}>
                    {/*<Route element={<ProtectedRoute username={localStorage.getItem('username')} />}>*/}
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/uploads/" element={<UploadsPage />} />
                        <Route path="/uploads/:videoid" element={<Uploads />} />
                        <Route path="/streams/:streamid" element={<Streams />} />
                        <Route path="/blacklist" element={<Blacklist />} />
                        <Route path="/playback" element={<Playback />} />
                        <Route path="/replay/:recordid" element={<PlaybackPlayer />} />
                        <Route path="/blacklist/:id" element={<BlacklistProfile />} />
                        <Route path="/blacklist/new" element={<NewProfile />} />
                    {/*</Route>*/}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
