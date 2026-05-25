import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
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
import JobTrends from "./components/JobTrend/JobTrend";
import GapAnalysis from "./components/GapAnalysis/GapAnalysis";
import RecommendationCourses from "./components/RecommendationCourses/RecommendationCourses";
import RoadmapAI from "./components/RoadmapAI/RoadmapAI";
import CVAnalysis from "./components/CVAnalysis/CVAnalysis";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AnalyticsOverview from "./components/AdminOverview/AdminOverview";
import AdminUserGrowth from "./components/AdminUserGrowth/AdminUserGrowth";


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
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/admindashboard" element={<AdminDashboard />} />

        <Route path="/completeprofile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="analytics" element={<AnalyticsOverview />} />
          <Route path="usergrowth" element={<AdminUserGrowth />} />
        </Route>

        {/* App Layout (after login) */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aimentor" element={<Aiagent />} />
          <Route path="/learningpath" element={<LearningPath />} />
          <Route path="/Skills" element={<Skills />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/studyplanner" element={<StudyPlanner />} />
          <Route path="/jobtrends" element={<JobTrends />} />
          <Route path="/gapanalysis" element={<GapAnalysis />} />
          <Route path="/aimentor" element={<Aiagent />} />
          <Route path="/aimentor/recommendation" element={<RecommendationCourses />} />
          <Route path="/aimentor/roadmap" element={<RoadmapAI />} />
          <Route path="/aimentor/cv-analysis" element={<CVAnalysis />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
