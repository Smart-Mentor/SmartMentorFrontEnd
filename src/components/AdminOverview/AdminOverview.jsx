import { useState, useEffect } from "react";
import styles from "./AdminOverview.module.css";

const AnalyticsOverview = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/Admin/analytics/overview", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data.data || data);
      } else if (response.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else {
        setError("Failed to fetch analytics data.");
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatPercentage = (value) => {
    return typeof value === 'number' ? `${value.toFixed(1)}%` : '0%';
  };

  const getRateColor = (rate) => {
    if (rate >= 80) return styles.high_rate;
    if (rate >= 50) return styles.medium_rate;
    return styles.low_rate;
  };

  if (loading) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_spinner}></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error_container}>
        <div className={styles.error_icon}>⚠️</div>
        <p>{error}</p>
        <button onClick={fetchAnalytics} className={styles.retry_btn}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.analytics_container}>
      {/* Header Section */}
      <div className={styles.header_section}>
        <div>
          <h1 className={styles.page_title}>Analytics Dashboard</h1>
          <p className={styles.page_subtitle}>Track your platform's performance and user engagement</p>
        </div>
        <div className={styles.date_badge}>
          Last 30 Days
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className={styles.key_metrics_grid}>
        <div className={`${styles.key_metric_card} ${styles.total_users_card}`}>
          <div className={styles.metric_icon}>👥</div>
          <div className={styles.metric_content}>
            <p className={styles.metric_label}>Total Users</p>
            <h2 className={styles.metric_value}>{analyticsData?.totalUsers?.toLocaleString() || 0}</h2>
          </div>
          <div className={styles.metric_trend}>
            <span className={styles.trend_up}>+{analyticsData?.newUsersLast30Days || 0}</span>
            <span className={styles.trend_label}>new</span>
          </div>
        </div>

        <div className={`${styles.key_metric_card} ${styles.active_users_card}`}>
          <div className={styles.metric_icon}>⚡</div>
          <div className={styles.metric_content}>
            <p className={styles.metric_label}>Active Users</p>
            <h2 className={styles.metric_value}>{analyticsData?.activeUsersLast30Days || 0}</h2>
          </div>
          <div className={styles.metric_trend}>
            <span className={styles.metric_rate}>{formatPercentage(analyticsData?.activeUserRateLast30Days)}</span>
            <span className={styles.trend_label}>activity rate</span>
          </div>
        </div>

        <div className={`${styles.key_metric_card} ${styles.verified_users_card}`}>
          <div className={styles.metric_icon}>✅</div>
          <div className={styles.metric_content}>
            <p className={styles.metric_label}>Verified Users</p>
            <h2 className={styles.metric_value}>{analyticsData?.verifiedUsers?.toLocaleString() || 0}</h2>
          </div>
          <div className={styles.metric_trend}>
            <span className={getRateColor(analyticsData?.verificationRate)}>
              {formatPercentage(analyticsData?.verificationRate)}
            </span>
          </div>
        </div>
      </div>

      {/* Engagement Metrics Row */}
      <div className={styles.engagement_section}>
        <div className={styles.section_header}>
          <h3 className={styles.section_title}>User Engagement</h3>
          <p className={styles.section_subtitle}>Profile completion and goal setting metrics</p>
        </div>

        <div className={styles.engagement_grid}>
          {/* Profile Completion Card */}
          <div className={styles.progress_card}>
            <div className={styles.progress_header}>
              <div className={styles.progress_icon}>📝</div>
              <div className={styles.progress_info}>
                <h4>Profile Completion</h4>
                <p className={styles.progress_stats}>
                  {analyticsData?.profileCompletedUsers || 0} / {analyticsData?.totalUsers || 0} users
                </p>
              </div>
            </div>
            <div className={styles.progress_bar_container}>
              <div 
                className={styles.progress_bar} 
                style={{ width: `${analyticsData?.profileCompletionRate || 0}%` }}
              ></div>
            </div>
            <div className={styles.progress_footer}>
              <span className={styles.progress_percentage}>
                {formatPercentage(analyticsData?.profileCompletionRate)}
              </span>
              <span className={styles.progress_status}>
                {analyticsData?.profileCompletionRate >= 50 ? "Good progress! 🎯" : "Room for improvement 📈"}
              </span>
            </div>
          </div>

          {/* Career Goal Card */}
          <div className={styles.progress_card}>
            <div className={styles.progress_header}>
              <div className={styles.progress_icon}>🎯</div>
              <div className={styles.progress_info}>
                <h4>Career Goal Set</h4>
                <p className={styles.progress_stats}>
                  {analyticsData?.usersWithCareerGoal || 0} / {analyticsData?.totalUsers || 0} users
                </p>
              </div>
            </div>
            <div className={styles.progress_bar_container}>
              <div 
                className={styles.progress_bar} 
                style={{ width: `${analyticsData?.careerGoalSelectionRate || 0}%` }}
              ></div>
            </div>
            <div className={styles.progress_footer}>
              <span className={styles.progress_percentage}>
                {formatPercentage(analyticsData?.careerGoalSelectionRate)}
              </span>
              <span className={styles.progress_status}>
                {analyticsData?.careerGoalSelectionRate >= 50 ? "Great engagement! 🎯" : "Encourage goal setting 📌"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className={styles.details_section}>
        <div className={styles.section_header}>
          <h3 className={styles.section_title}>Detailed Statistics</h3>
        </div>
        <div className={styles.stats_table}>
          <div className={styles.table_row}>
            <div className={styles.table_label}>Total User Base</div>
            <div className={styles.table_value}>{analyticsData?.totalUsers?.toLocaleString() || 0}</div>
            <div className={styles.table_trend}>100%</div>
          </div>
          <div className={styles.table_row}>
            <div className={styles.table_label}>New Sign-ups (30 days)</div>
            <div className={styles.table_value}>{analyticsData?.newUsersLast30Days?.toLocaleString() || 0}</div>
            <div className={styles.table_trend}>
              {((analyticsData?.newUsersLast30Days / analyticsData?.totalUsers) * 100).toFixed(1)}% of total
            </div>
          </div>
          <div className={styles.table_row}>
            <div className={styles.table_label}>Verified Accounts</div>
            <div className={styles.table_value}>{analyticsData?.verifiedUsers?.toLocaleString() || 0}</div>
            <div className={styles.table_trend}>{formatPercentage(analyticsData?.verificationRate)}</div>
          </div>
          <div className={styles.table_row}>
            <div className={styles.table_label}>Active Users (30 days)</div>
            <div className={styles.table_value}>{analyticsData?.activeUsersLast30Days?.toLocaleString() || 0}</div>
            <div className={styles.table_trend}>{formatPercentage(analyticsData?.activeUserRateLast30Days)}</div>
          </div>
          <div className={styles.table_row}>
            <div className={styles.table_label}>Completed Profiles</div>
            <div className={styles.table_value}>{analyticsData?.profileCompletedUsers?.toLocaleString() || 0}</div>
            <div className={styles.table_trend}>{formatPercentage(analyticsData?.profileCompletionRate)}</div>
          </div>
          <div className={styles.table_row}>
            <div className={styles.table_label}>Career Goals Set</div>
            <div className={styles.table_value}>{analyticsData?.usersWithCareerGoal?.toLocaleString() || 0}</div>
            <div className={styles.table_trend}>{formatPercentage(analyticsData?.careerGoalSelectionRate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;