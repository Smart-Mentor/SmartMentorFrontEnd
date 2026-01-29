import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Aiagent from "./pages/Aiagent";
import LearningPath from "./pages/LearningPath";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT -> LOGIN */}
        <Route path="/" element={<Navigate to="/login" />} />

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
