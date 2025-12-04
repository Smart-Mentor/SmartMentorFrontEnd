import LampLight from "../assets/Lamp_light2.png";
import Like from "../assets/thumb_up.png";
import Dislike from "../assets/thumb_down.png";
import SendBtn from "../assets/send.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function MentorChat() {
  return (
    <div
      style={{
        width: "43%",
        border: "1px solid #00000033",
        borderRadius: "16px",
        fontFamily: "Hanuman",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "25px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={LampLight}
          alt=""
          width={"42.0753288269043px"}
          height={"42.0753288269043px"}
        />
        <p style={{ fontSize: "30px", fontWeight: "700" }}>AI Mentor Chat</p>
      </div>
      <div style={{ border: "1px solid #00000033", height: "56%" }}>
        <div
          style={{
            backgroundColor: "#D9D9D9",
            borderRadius: "16px",
            height: "63%",
          }}
        >
          <p style={{ fontWeight: "300" }}>
            Hello! I'm your AI Career Mentor. I can help you with skill
            analysis, career advice, learning roadmaps, and more. How can I
            assist you today?
          </p>
          <div
            style={{
              display: "flex",
              marginLeft: "5px",
              gap: "10px",
              marginBottom: "40px",
            }}
          >
            <button
              style={{
                border: "none",
                backgroundColor: "inherit",
                cursor: "pointer",
              }}
            >
              <img src={Like} alt="" />
            </button>
            <button
              style={{
                border: "none",
                backgroundColor: "inherit",
                cursor: "pointer",
              }}
            >
              <img src={Dislike} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          margin: "20px 0px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Ask me anything about your career......"
          variant="outlined"
          sx={{
            width: "80%",
            "& .MuiOutlinedInput-root fieldset": {
              borderRadius: "20px",
              backgroundColor: "#D9D9D980",
              border: "none",
              fontFamily: "Hanuman",
            },
            "& .MuiInputLabel-root": {
              fontFamily: "Hanuman",
              fontSize: "18px",
            },
            "& .MuiInputBase-root": { fontFamily: "Hanuman" },
          }}
        />
        <Button
          style={{ width: "15%", height: "60px", textTransform: "none" }}
          variant="contained"
        >
          <img src={SendBtn} alt="" />
        </Button>
      </div>
    </div>
  );
}
