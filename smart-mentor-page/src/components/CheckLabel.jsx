import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

export default function CheckLabel({label}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <TaskAltOutlinedIcon
          style={{
            color: "#17838D",
            width: "25.365436553955078px",
            height: "31.833166122436523px",
          }}
        />
        <p>{label}</p>
      </div>
    </div>
  );
}
