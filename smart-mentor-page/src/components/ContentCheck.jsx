import CheckLabel from "./CheckLabel";

export default function ContentCheck() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        columnGap: "150px",
        fontFamily: "Hanuman",
        fontSize: "17.78px",
        fontWeight: "300",
        marginTop: "41px",
        color: "#00000094",
        flexWrap: "wrap",
      }}
    >
      <CheckLabel label={"Free to start"} />
      <CheckLabel label={"No credit card required"} />
    </div>
  );
}
