export default function CareerCards({ num, title, body }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #00000080",
        borderRadius: "12px",
        fontFamily: "Hanuman",
        width: "329.820556640625px",
        height: "254px",
      }}
    >
      <p
        style={{
          fontSize: "100.59px",
          fontWeight: "400",
          color: "#000000BD",
          margin: "0px",
        }}
      >
        {num}
      </p>
      <p style={{ fontSize: "24px", fontWeight: "700", margin: "0px" }}>
        {title}
      </p>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "400",
          color: "#00000094",
          margin: "0px",
        }}
      >
        {body}
      </p>
    </div>
  );
}
