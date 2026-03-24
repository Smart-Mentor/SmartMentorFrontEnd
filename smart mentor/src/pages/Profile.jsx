import { Avatar, Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Progress_img from "../assets/book-open_.png";
import Document_img from "../assets/File_dock.png";
import DownloadIcon from "@mui/icons-material/Download";
import Fundementals from "../assets/book-open_.png";
import Community from "../assets/users_blue.png";
import Portfolio from "../assets/File_dock.png";
import Badge from "../assets/Flag_alt.png";

function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

let name = "Ahmed Samy";

let stats = [
  {name:"Courses Completed",num:10},
  {name:"Projects Done",num:8},
  {name:"Community Points",num:247},
  {name:"Badges Earned",num:5},
]

let progress = [
  {name:"Fundamentals",percentage:80},
  {name:"Core Skills",percentage:45},
  {name:"Advanced",percentage:0},
]

let projects = [
  {name:"E-commerce Platform",level:"Intermediate",statue:"In Progress"},
  {name:"Weather Dashboard",level:"Beginner",statue:"Completed"},
  {name:"Social Media App",level:"Advance",statue:"Not Started"},
]

let skills = [
  {name:"React",percentage:80},
  {name:"Node.js",percentage:70},
  {name:"TypeScript",percentage:60},
  {name:"MongoDB",percentage:50},
]

let badges = [
  {badge:"🎯",heading:"First Steps",content:"Completed profile setup"},
  {badge:"⚡",heading:"Quick Learner",content:"Finished 5 courses"},
  {badge:"🤝",heading:"Community Helper",content:"Helped 10 people"},
  {badge:"🏆",heading:"Project Master",content:"Completed 3 projects"},
]

let activities = [
  {logo:Fundementals,title:"Completed React Fundamentals",history:"2 hours ago"},
  {logo:Community,title:"Answered question in Community",history:"Yesterday"},
  {logo:Portfolio,title:"Updated Portfolio Project",history:"2 days ago"},
  {logo:Badge,title:"Earned Quick Learner Badge",history:"3 days ago"},
]
export default function Profile() {

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <div
      style={{
        border: "1px solid #00000066",
        borderRadius: "12px",
        width: "94%",
        margin: "5px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "15px",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Avatar
          {...stringAvatar(`${name}`)}
          style={{
            width: "88px",
            height: "88px",
            color: "#000000CC",
            fontSize: "44px",
          }}
        />
        <div style={{ textAlign: "start" }}>
          <h1>{name}</h1>
          <p style={{ marginTop: "-25px" }}>Frontend Developer</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          flexWrap: "wrap",
          marginLeft: "12%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <MailOutlineIcon />
          <p>ahmed.samy@example.com</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <LocationOnOutlinedIcon />
          <p>Cairo, Egypt</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <CalendarTodayIcon />
          <p>Joined January 2025</p>
        </div>
      </div>
    </div>

        <div style={{display:"flex", justifyContent:"space-evenly", flexWrap:"wrap", marginTop:"20px", gap:"20px"}}>
          {stats.map((label,index)=>(
            <div key={index} style={{border: "1px solid #00000066", borderRadius:"12px", minWidth:"20%", width:"150px"}}>
        <p>{label.name}</p>
        <h1>{label.num}</h1>
    </div>
          ))}
    </div>

      <TabContext value={value}>
  <Box
    sx={{
      border: "1px solid transperent",
      borderRadius: "8px",
      bgcolor: "#CECECE",
      minidth:"100%",
      maxWidth: "400px",
      marginTop:"20px",
      marginLeft:"3%",
    }}
  >
    <TabList
      onChange={handleChange}
      TabIndicatorProps={{ style: { display: "none" } }}
      sx={{padding:"5px"}}
    >
      <Tab
        label="Overview"
        value="1"
        sx={{ "&.Mui-selected": { bgcolor: "#fff" , color:"black" , borderRadius:"8px" }, textTransform:"none", width:"25%" }}
      />
      <Tab
        label="Skills"
        value="2"
        sx={{ "&.Mui-selected": { bgcolor: "#fff" , color:"black" , borderRadius:"8px" }, textTransform:"none", width:"25%" }}
      />
      <Tab
        label="Badges"
        value="3"
        sx={{ "&.Mui-selected": { bgcolor: "#fff" , color:"black" , borderRadius:"8px" }, textTransform:"none", width:"25%" }}
      />
      <Tab
        label="Activity"
        value="4"
        sx={{ "&.Mui-selected": { bgcolor: "#fff" , color:"black" , borderRadius:"8px" }, textTransform:"none", width:"25%" }}
      />
    </TabList>
  </Box>

  <TabPanel value="1">

    <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:"50px"}}>

    <div style={{border: "1px solid #00000066" , borderRadius:"8px", minWidth:"45%", width:"300px"}}>
      <div style={{display:"flex", alignItems:"center", gap:"10px", padding:"10px", marginLeft:"10px"}}>
        <img src={Progress_img}/>
        <div style={{textAlign:"start"}}>
          <h4>Roadmap Progress</h4>
          <p style={{marginTop:"-20px"}}>Frontend Developer Path</p>
        </div>
      </div>

      <div style={{marginBottom:"30px"}}>
        {progress.map((label,index)=>(
                  <div key={index} style={{width:"95%", margin:"auto"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <p>{label.name}</p>
            <p>{label.percentage}%</p>
          </div>
          <Box
              sx={{
                height: "8px",
                backgroundColor: "#E5E5E5",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${label.percentage}%`,
                  height: "100%",
                  backgroundColor: "#0A5ADB",
                  borderRadius: "10px",
                  transition: "width 0.5s ease",
                }}
              />
            </Box>
        </div>
        ))}
      </div>
    </div>

    <div style={{border: "1px solid #00000066" , borderRadius:"8px", minWidth:"45%", width:"300px"}}>
      <div style={{textAlign:"start" , padding:"10px", marginLeft:"10px"}}>
        <h4>Saved Projects</h4>
        <p style={{marginTop:"-20px"}}>Your project bookmarks</p>
      </div>
      {projects.map((label,index)=>(
        <div key={index} style={{border: "0.5px solid #00000066" , borderRadius:"12px", textAlign:"start", width:"90%", margin:"auto", marginBottom:"10px"}}>
        <h4 style={{marginLeft:"15px"}}>{label.name}</h4>
        <div style={{display:"flex", alignItems:"center", marginTop:"-30px", gap:"15px", marginLeft:"15px"}}>
          <div style={{border: "0.5px solid #00000066" , borderRadius:"12px", width:"25%", textAlign:"center"}}>
            <span>{label.level}</span>
          </div>
          <p style={{color:"#0A5ADB"}}>{label.statue}</p>
        </div>
      </div>
      ))}
    </div>
    </div>

        <div style={{border: "1px solid #00000066",borderRadius: "12px",width: "97%",margin: "30px auto"}}>
          <div style={{display:"flex", alignItems:"center", gap:"10px", padding:"10px", marginLeft:"10px"}}>
            <img src={Document_img}/>
            <div style={{textAlign:"start"}}>
              <h4>CV & Documents</h4>
              <p style={{marginTop:"-20px"}}>Your uploaded documents</p>
            </div>
          </div>
          <div style={{border: "1px solid #00000066", borderRadius:"8px",width: "90%",margin: "5px auto", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <div style={{display:"flex", alignItems:"center", gap:"10px", padding:"10px", marginLeft:"10px"}}>
              <img src={Document_img} style={{width:"28px", height:"28px"}}/>
              <div style={{textAlign:"start"}}>
                <h4>Ahmed_Samy_CV.pdf</h4>
                <p style={{marginTop:"-20px"}}>Uploaded 2 days ago</p>
              </div>
            </div>
            <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              marginRight:"30px"
            }}
          >
            Download
          </Button>
          </div>
          <br />
        </div>

  </TabPanel>

  <TabPanel value="2">
    <div style={{border: "1px solid #00000066", borderRadius:"8px", width:"97%", margin:"30px auto"}}>
      <div style={{textAlign:"start", padding:"10px", marginLeft:"10px"}}>
          <h2>Your Skills</h2>
          <p style={{marginTop:"-20px"}}>Current proficiency levels</p>
        </div>
      {skills.map((label,index)=>(
                  <div key={index} style={{width:"95%", margin:"auto"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <p>{label.name}</p>
            <p>{label.percentage}%</p>
          </div>
          <Box
              sx={{
                height: "8px",
                backgroundColor: "#E5E5E5",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${label.percentage}%`,
                  height: "100%",
                  backgroundColor: "#0A5ADB",
                  borderRadius: "10px",
                  transition: "width 0.5s ease",
                }}
              />
            </Box>
        </div>
        ))}
        <br />
    </div>
  </TabPanel>

  <TabPanel value="3">
    <div style={{display:"flex", justifyContent:"space-evenly", flexWrap:"wrap", marginTop:"20px", gap:"20px"}}>
          {badges.map((label,index)=>(
            <div key={index} style={{border: "1px solid #00000066", borderRadius:"12px", minWidth:"20%", width:"150px"}}>
        <h1 style={{fontSize:"50px"}}>{label.badge}</h1>
        <h4>{label.heading}</h4>
        <p style={{marginTop:"-24px"}}>{label.content}</p>
    </div>
          ))}
    </div>
  </TabPanel>

  <TabPanel value="4">
    <div style={{border: "1px solid #00000066", borderRadius:"8px", width:"97%", margin:"30px auto"}}>
      <div style={{textAlign:"start", padding:"10px", marginLeft:"10px"}}>
          <h2>Recent Activity</h2>
          <p style={{marginTop:"-20px"}}>Your latest actions on the platform</p>
      </div>
      {activities.map((label,index)=>(
      <div key={index} style={{display:"flex", alignItems:"center", gap:"10px", padding:"10px", marginLeft:"10px", marginTop:"-45px"}}>
        <img src={label.logo}/>
        <div style={{textAlign:"start"}}>
          <h4>{label.title}</h4>
          <p style={{marginTop:"-20px"}}>{label.history}</p>
        </div>
      </div>
      ))}
    </div>
  </TabPanel>
</TabContext>

    </>
  );
}
