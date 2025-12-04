import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Aiagent from "./pages/Aiagent";
// import learningpath from "./pages/learningpath";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default Dashboard */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="aimentor" element={<Aiagent />} />
          {/* <Route path="learningpath" element={<learningpath />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
