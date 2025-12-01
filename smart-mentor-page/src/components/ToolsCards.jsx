import Lamp from "../assets/Lamp_light@3x.png";
import Target from "../assets/target.png";
import Trends from "../assets/trends.png";
import Users from "../assets/users.png";
import ToolCard from "./ToolCard";

export default function ToolsCards() {
  return (
    <div
      style={{
        marginTop: "105px",
        display: "flex",
        justifyContent: "space-around",
        rowGap: "50px",
        flexWrap: "wrap",
      }}
    >
      <ToolCard
        img={Lamp}
        title={"AI-Powered Mentorship"}
        body={"Get personalized career guidance from our advanced AI mentor"}
      />
      <ToolCard
        img={Target}
        title={"Custom Learning Paths"}
        body={"Tailored roadmaps based on your goals and current skills"}
      />
      <ToolCard
        img={Trends}
        title={"Job Market Insights"}
        body={"Stay ahead with real-time trends in Egyptian tech market"}
      />
      <ToolCard
        img={Users}
        title={"Thriving Community"}
        body={"Connect with peers and mentors on your journey"}
      />
    </div>
  );
}
