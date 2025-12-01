import Lamp from "../assets/Lamp_light@3x.png";
import Target from "../assets/target.png";
import Trends from "../assets/trends.png";
import Users from "../assets/users.png";
import ContentBtns from "./ContentBtns";
import ContentCheck from "./ContentCheck";
import CareerSteps from "./CareerSteps";
import ToolsCards from "./ToolsCards";

export default function MainContent() {
  return (
    <div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "53.34px",
            fontWeight: "700",
          }}
        >
          Your Smart Mentor for <span style={{ color: "#0E6ADB" }}>Career</span>
          <br />
          <span className="Success">Success</span>
        </p>
        <p style={{ fontSize: "18px", fontWeight: "300" }}>
          Navigate your career journey with AI-powered guidance, personalized
          learning paths,
          <br /> and real-time job market insights tailored for Egyptian
          students and professionals.
        </p>
      </div>

      <div>
        <ContentBtns />
      </div>

      <div>
        <ContentCheck />
      </div>

      <div style={{ marginTop: "170px" }}>
        <p
          style={{
            fontSize: "53.34px",
            fontWeight: "700",
            marginBottom: "0px",
          }}
        >
          How It Works
        </p>
        <p
          style={{ fontSize: "23.71px", fontWeight: "400", color: "#00000094" }}
        >
          Three simple steps to transform your career
        </p>
      </div>

      <div>
        <CareerSteps />
      </div>

      <div style={{ marginTop: "80px" }}>
        <p
          style={{
            fontSize: "53.34px",
            fontWeight: "700",
            marginBottom: "0px",
          }}
        >
          Everything You Need to Succeed
        </p>
        <p
          style={{
            fontSize: "23.71px",
            fontWeight: "400",
            color: "#00000094",
          }}
        >
          Comprehensive tools and insights for your career growth
        </p>
      </div>

      <div>
        <ToolsCards />
      </div>
    </div>
  );
}
