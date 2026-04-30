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


// 🔥 حولناها لكومبوننت صح
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const verificationToken = localStorage.getItem("verificationToken");

  if (!token) return <Navigate to="/login" replace />;

  if (verificationToken) return <Navigate to="/verify-email" replace />;

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* ✅ Public */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔒 Complete Profile */}
        <Route
          path="/completeprofile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />

        {/* 🔒 Layout + Protected Pages */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aimentor" element={<Aiagent />} />
          <Route path="/learningpath" element={<LearningPath />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/studyplanner" element={<StudyPlanner />} />
        </Route>

        {/* ❌ أي حاجة غلط */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;