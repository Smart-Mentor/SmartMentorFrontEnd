export default function Actions({ name, image }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F1F0F099",
        borderRadius: "16px",
        fontSize: "24px",
        gap: "10px",
        padding: "10px",
      }}
    >
      <img src={image} alt="" width={"24px"} height={"24px"} />
      <span>{name}</span>
    </div>
  );
}
