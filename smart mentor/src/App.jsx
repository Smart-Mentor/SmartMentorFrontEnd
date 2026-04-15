import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Aiagent from "./pages/Aiagent";
import SkillsPage from "./pages/Skills";
import LearningPath from "./pages/LearningPath";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CompleteProfile from "./pages/CompleteProfile";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT -> HOME */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Home Page */}
        <Route path="/home" element={<Home />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* CompleteProfile Page */}
        <Route path="/completeprofile" element={<CompleteProfile />} />

        {/* App Layout (after login) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aimentor" element={<Aiagent />} />
          <Route path="/learningpath" element={<LearningPath />} />
          <Route path="/Skills" element={<SkillsPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Any wrong route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
