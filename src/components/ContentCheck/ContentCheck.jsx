import CheckLabel from "../CheckLabel/CheckLabel";
import styles from "./ContentCheck.module.css";

export default function ContentCheck() {
  return (
    <div className={styles.content_check_container}>
      <div className={styles.check_wrapper}>
        <CheckLabel label={"Free to start"} />
        <div className={styles.divider}></div>
        <CheckLabel label={"No credit card required"} />
      </div>
      
      {/* Decorative elements */}
      <div className={styles.decorative_circle}></div>
      <div className={styles.decorative_sparkle_1}>✨</div>
      <div className={styles.decorative_sparkle_2}>⚡</div>
    </div>
  );
}