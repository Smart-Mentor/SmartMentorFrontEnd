import { Button } from "@mui/material";

export default function NavBtn({
  name,
  color = "inherit",
  bgcolor = "inherit",
}) {
  return (
    <div>
      <Button
        style={{
          width: "188.16146850585938px",
          height: "66.67138671875px",
          fontFamily: "Halant",
          fontSize: "33px",
          border: "1.48px solid #00000033",
          borderRadius: "20px",
          textTransform: "none",
          color: `${color}`,
          backgroundColor: `${bgcolor}`,
        }}
        variant="text"
      >
        {name}
      </Button>
    </div>
  );
}
