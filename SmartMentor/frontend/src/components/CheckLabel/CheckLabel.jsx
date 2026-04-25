import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./CheckLabel.module.css";

export default function CheckLabel({ label }) {
  return (
    <div className={styles.check_label}>
      <div className={styles.icon_wrapper}>
        <CheckCircleIcon className={styles.check_icon} />
        <div className={styles.icon_pulse}></div>
      </div>
      <span className={styles.label_text}>{label}</span>
    </div>
  );
}