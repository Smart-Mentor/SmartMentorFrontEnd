import React, { useState, useEffect } from "react";
import styles from "../JobTrend/JobTrend.module.css";

export default function JobTrends() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Your Power BI report URL
  const powerBiUrl = "";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError("Dashboard is taking longer than expected. Try opening in new tab.");
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError("Unable to load the dashboard. Please try opening in a new tab.");
  };

  const handleOpenInNewTab = () => {
    window.open(powerBiUrl, "_blank");
  };

  return (
    <div className={styles.job_trends_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      {/* Header Section - Minimal */}
      <div className={styles.header_section}>
        <div className={styles.header_left}>
          <div className={styles.header_icon_wrapper}>
            <i className="fas fa-chart-line"></i>
          </div>
          <div>
            <h1 className={styles.header_title}>Job Market Dashboard</h1>
            <p className={styles.header_subtitle}>
              Real-time job market insights and analytics
            </p>
          </div>
        </div>
        <div className={styles.header_buttons}>
          <button className={styles.newtab_btn} onClick={handleOpenInNewTab} title="Open in new tab">
            <i className="fas fa-external-link-alt"></i> Full Screen
          </button>
        </div>
      </div>

      {/* Iframe Section - Full height */}
      <div className={styles.iframe_section}>
        {isLoading && (
          <div className={styles.loading_overlay}>
            <div className={styles.loading_spinner}></div>
            <p>Loading Power BI dashboard...</p>
          </div>
        )}
        
        {error && (
          <div className={styles.error_overlay}>
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Unable to Load Dashboard</h3>
            <p>{error}</p>
            <div className={styles.error_buttons}>
              <button className={styles.open_btn} onClick={handleOpenInNewTab}>
                <i className="fas fa-external-link-alt"></i> Open in New Tab
              </button>
            </div>
          </div>
        )}
        
        <iframe
          src={powerBiUrl}
          className={styles.trends_iframe}
          title="Power BI Job Market Dashboard"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="fullscreen"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}