import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Aiagent from "./components/Aiagent/Aiagent";
import LearningPath from "./components/LearningPath/LearningPath";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import CompleteProfile from "./components/CompleteProfile/CompleteProfile";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";
import Skills from "./components/Skills/Skills";
import StudyPlanner from "./components/StudyPlanner/StudyPlanner";
import Projects from "./components/Projects/Projects";

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

        {/* Progress Tracking Page */}
        {/* <Route path="/progresstracking" element={<ProgressTracking />} /> */}

        {/* App Layout (after login) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aimentor" element={<Aiagent />} />
          <Route path="/learningpath" element={<LearningPath />} />
          <Route path="/Skills" element={<Skills />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/studyplanner" element={<StudyPlanner />} />
        </Route>

        {/* Any wrong route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
