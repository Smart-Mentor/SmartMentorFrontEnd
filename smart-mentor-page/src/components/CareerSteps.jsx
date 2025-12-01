import CareerCards from "./CareerCards";

export default function CareerSteps() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        rowGap: "50px",
        flexWrap: "wrap",
      }}
    >
      <CareerCards
        num={"01"}
        title={"Create Your Profile"}
        body={"Tell us about your skills and career aspirations"}
      />
      <CareerCards
        num={"02"}
        title={"Get Your Roadmap"}
        body={"Receive a personalized learning path powered by AI"}
      />
      <CareerCards
        num={"03"}
        title={"Start Learning"}
        body={"Follow your path, track progress, and achieve your goals"}
      />
    </div>
  );
}
