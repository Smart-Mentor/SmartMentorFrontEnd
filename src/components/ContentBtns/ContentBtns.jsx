import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import SchoolIcon from "@mui/icons-material/School";
import styles from "./ContentBtns.module.css";

export default function ContentBtns() {
  return (
    <div className={styles.buttons_container}>
      <div className={styles.buttons_wrapper}>
        {/* Primary Button */}
        <Button
          className={`${styles.btn} ${styles.primary_btn}`}
          variant="contained"
          endIcon={<ArrowForwardIcon className={styles.btn_icon} />}
        >
          <span className={styles.btn_text}>Start Your Journey</span>
          <span className={styles.btn_glow}></span>
        </Button>

        {/* Secondary Button */}
        <Button
          className={`${styles.btn} ${styles.secondary_btn}`}
          variant="outlined"
          startIcon={<AutoStoriesOutlinedIcon className={styles.btn_icon} />}
        >
          <span className={styles.btn_text}>Explore Learning Tracks</span>
        </Button>
      </div>

      {/* Decorative elements */}
      <div className={styles.decorative_dots}></div>
      <div className={styles.decorative_line}></div>
    </div>
  );
}