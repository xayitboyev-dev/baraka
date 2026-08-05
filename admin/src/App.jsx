import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Randomizer from "./pages/Randomizer.jsx";
import LiveUsers from "./pages/LiveUsers.jsx";
import Users from "./pages/Users.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/randomizer" element={<Randomizer />} />
        <Route path="/users" element={<Users />} />
        <Route path="/live_users" element={<LiveUsers />} />
      </Routes>
    </BrowserRouter>
  );
};