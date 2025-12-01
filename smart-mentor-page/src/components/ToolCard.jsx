export default function ToolCard({ img, title, body }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #00000080",
        borderRadius: "12px",
        width: "255px",
        height: "180px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={`${img}`}
        alt=""
        style={{
          width: "42.0753288269043px",
          height: "42.0753288269043px",
          borderRadius: "58.44px",
        }}
      />
      <p
        style={{
          fontSize: "18.7px",
          fontWeight: "700",
          marginBottom: "0px",
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: "14.03px",
          fontWeight: "400",
          color: "#00000094",
        }}
      >
        {body}
      </p>
    </div>
  );
}
