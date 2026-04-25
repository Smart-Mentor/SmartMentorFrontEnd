import Navbar from "../Navbar/Navbar";
import MainContent from "../MainContent/MainContent";

export default function Home() {
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
