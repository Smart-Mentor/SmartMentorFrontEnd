import "./App.css";
import MainContent from "./components/MainContent";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div
        style={{
          borderBottom: "1.48px solid #00000085",
        }}
      >
        <Navbar />
      </div>

      <div style={{ marginTop: "98px" }}>
        <MainContent />
      </div>
    </>
  );
}

export default App;
