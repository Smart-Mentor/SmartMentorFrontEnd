import AnalyzeSkills from "../assets/AnalyzeSkills.png";
import CareerAdvice from "../assets/CareerAdvice.png";
import GenerateRoadmap from "../assets/GenerateRoadmap.png";
import ReviewCV from "../assets/ReviewCV.png";
import Actions from "./Actions";

export default function QuickActions() {
  return (
    <div
      style={{
        border: "1px solid #00000033",
        borderRadius: "25px",
        fontFamily: "Hanuman",
        Width: "30%",
      }}
    >
      <p style={{ fontSize: "30px", fontWeight: "700" }}>Quick Actions</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginBottom: "75px",
        }}
      >
        <Actions name={"Analyze Skills"} image={AnalyzeSkills} />
        <Actions name={"Career Advice"} image={CareerAdvice} />
        <Actions name={"Generate Roadmap"} image={GenerateRoadmap} />
        <Actions name={"Review CV"} image={ReviewCV} />
      </div>
    </div>
  );
}
