import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

export default function ContentBtns() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "50px",
        marginTop: "93px",
        flexWrap: "wrap",
      }}
    >
      <Button
        style={{
          width: "343.72802734375px",
          height: "60.74504470825195px",
          textTransform: "none",
          fontFamily: "Hanuman",
          backgroundColor: "#0A5ADB",
          color: "white",
          fontSize: "27.2px",
          borderRadius: "11.85px",
        }}
        variant="text"
        endIcon={<ArrowForwardIcon style={{ fontSize: "27.2px" }} />}
      >
        Start Your Journey
      </Button>
      <Button
        style={{
          width: "343.72802734375px",
          height: "60.74504470825195px",
          textTransform: "none",
          fontFamily: "Hanuman",
          fontSize: "23.71px",
          borderRadius: "11.85px",
          color: "black",
          border: "1.48px solid #0000004A",
        }}
        variant="text"
        startIcon={<AutoStoriesOutlinedIcon style={{ fontSize: "23.71px" }} />}
      >
        Explore Learning Tracks
      </Button>
    </div>
  );
}
