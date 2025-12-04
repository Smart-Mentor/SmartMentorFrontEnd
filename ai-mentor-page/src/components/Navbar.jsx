import Logo from "../assets/Logo.png";
import User from "../assets/user.png";

export default function Navbar() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          top: "-3px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            height: "156px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={Logo}
            alt=""
            style={{
              width: "107.95454406738281px",
              height: "107.95454406738281px",
            }}
          />
          <p
            style={{ fontFamily: "Haettenschweiler", fontSize: "60.61px" }}
            className="page-title"
          >
            SmartMentor
          </p>
        </div>
        <div>
          <img src={User} alt="" width="30px" height="30px"/>
        </div>
      </div>
    </div>
  );
}
