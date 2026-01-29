import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Aiagent from "./pages/Aiagent";
import LearningPath from "./pages/LearningPath";
import Home from "./pages/Home";

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

        {/* App Layout (after login) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aimentor" element={<Aiagent />} />
          <Route path="/learningpath" element={<LearningPath />} />
        </Route>

        {/* Any wrong route */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
