import Logo from "../assets/Logo.png";
import NavBtn from "./NavBtn";

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
              width: "91.85836029052734px",
              height: "91.85836029052734px",
            }}
          />
          <p
            style={{ fontFamily: "Haettenschweiler", fontSize: "53.34px" }}
            className="page-title"
          >
            SmartMentor
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <NavBtn name={"Login"} />
          <NavBtn name={"Get Started"} bgcolor="#2563EB" color="white" />
        </div>
      </div>
    </div>
  );
}
