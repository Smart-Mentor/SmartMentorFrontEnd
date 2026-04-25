import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 11500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className={styles.page_404}>
      <div className={styles.container}>
        <div className={styles.row}>	
          <div className={styles.col_sm_12}>
            <div className={`${styles.col_sm_10} ${styles.col_sm_offset_1} ${styles.text_center}`}>
              <div className={styles.four_zero_four_bg}>
                <h1 className={styles.text_center}>404</h1>
              </div>

              <div className={styles.contant_box_404}>
                <h3 className={styles.h2}>Look like you're lost</h3>
                <p>the page you are looking for not available!</p>
              </div>
              <p className={styles.redirect_text}>You will be redirected to home shortly...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;