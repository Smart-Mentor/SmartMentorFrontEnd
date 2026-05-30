// AdminUserGrowth.jsx
import { useState, useEffect } from "react";
import styles from "./AdminUserGrowth.module.css";

const AdminUserGrowth = () => {
  const [growthData, setGrowthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState("day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("registrations");
  const [dateError, setDateError] = useState("");

  // Get JWT token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Validate dates
  const validateDates = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end < start) {
        setDateError("End date cannot be earlier than start date");
        return false;
      }
      
      const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (daysDiff > 365) {
        setDateError("Date range cannot exceed 365 days");
        return false;
      }
    }
    
    setDateError("");
    return true;
  };

  // Format date for API (YYYY-MM-DD)
  const formatDateForAPI = (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
  };

  // Fetch user growth data from API
  const fetchUserGrowth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = getAuthToken();
      let url = `https://smartmentorapi.runasp.net/api/Admin/analytics/user-growth?groupBy=${groupBy}`;
      
      if (startDate) {
        url += `&startDate=${formatDateForAPI(startDate)}`;
      }
      if (endDate) {
        url += `&endDate=${formatDateForAPI(endDate)}`;
      }
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setGrowthData(result.data);
          setDateError("");
        } else {
          setError("Failed to load user growth data.");
        }
      } else if (response.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else {
        setError("Failed to fetch user growth data.");
      }
    } catch (error) {
      console.error("Error fetching user growth:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserGrowth();
  }, [groupBy]);

  const handleGroupByChange = (newGroupBy) => {
    setGroupBy(newGroupBy);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate && newStartDate) {
      const start = new Date(newStartDate);
      const end = new Date(endDate);
      if (end < start) {
        setDateError("End date cannot be earlier than start date");
      } else {
        const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (daysDiff > 365) {
          setDateError("Date range cannot exceed 365 days");
        } else {
          setDateError("");
        }
      }
    } else {
      setDateError("");
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (startDate && newEndDate) {
      const start = new Date(startDate);
      const end = new Date(newEndDate);
      if (end < start) {
        setDateError("End date cannot be earlier than start date");
      } else {
        const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (daysDiff > 365) {
          setDateError("Date range cannot exceed 365 days");
        } else {
          setDateError("");
        }
      }
    } else {
      setDateError("");
    }
  };

  const applyDateRange = () => {
    if (validateDates()) {
      fetchUserGrowth();
      setShowDatePicker(false);
    }
  };

  const resetDateRange = () => {
    setStartDate("");
    setEndDate("");
    setDateError("");
    setShowDatePicker(false);
    fetchUserGrowth();
  };

  // Calculate summary statistics from points data
  const calculateSummaryStats = () => {
    if (!growthData?.points || growthData.points.length === 0) {
      return {
        totalRegistrations: 0,
        totalVerified: 0,
        totalProfileCompleted: 0,
        avgActiveUsers: 0,
        peakRegistrations: 0,
        peakRegistrationPeriod: "",
      };
    }

    const points = growthData.points;
    let totalRegistrations = 0;
    let totalVerified = 0;
    let totalProfileCompleted = 0;
    let totalActiveSum = 0;
    let peakRegistrations = 0;
    let peakRegistrationPeriod = "";

    points.forEach((point) => {
      totalRegistrations += point.registrations || 0;
      totalVerified += point.verifiedUsers || 0;
      totalProfileCompleted += point.profileCompletedUsers || 0;
      totalActiveSum += point.activeUsers || 0;
      
      if ((point.registrations || 0) > peakRegistrations) {
        peakRegistrations = point.registrations || 0;
        peakRegistrationPeriod = point.periodLabel;
      }
    });

    const avgActiveUsers = points.length > 0 ? Math.round(totalActiveSum / points.length) : 0;
    const verificationRate = totalRegistrations > 0 ? (totalVerified / totalRegistrations) * 100 : 0;
    const profileCompletionRate = totalRegistrations > 0 ? (totalProfileCompleted / totalRegistrations) * 100 : 0;

    return {
      totalRegistrations,
      totalVerified,
      totalProfileCompleted,
      avgActiveUsers,
      peakRegistrations,
      peakRegistrationPeriod,
      verificationRate,
      profileCompletionRate,
    };
  };

  const stats = calculateSummaryStats();

  // Get max value for chart scaling with padding for number visibility
  const getMaxValue = () => {
    if (!growthData?.points) return 100;
    let maxValue = 0;
    growthData.points.forEach((point) => {
      const value = selectedMetric === "registrations" ? point.registrations :
                    selectedMetric === "verifiedUsers" ? point.verifiedUsers :
                    selectedMetric === "profileCompletedUsers" ? point.profileCompletedUsers :
                    point.activeUsers;
      if ((value || 0) > maxValue) maxValue = value || 0;
    });
    // Add 20% padding to the top for better number visibility
    return maxValue > 0 ? Math.ceil(maxValue * 1.2) : 10;
  };

  const maxValue = getMaxValue();

  const getMetricLabel = () => {
    switch(selectedMetric) {
      case "registrations": return "New Registrations";
      case "verifiedUsers": return "Verified Users";
      case "profileCompletedUsers": return "Profile Completed";
      case "activeUsers": return "Active Users";
      default: return "Registrations";
    }
  };

  const getMetricColor = () => {
    switch(selectedMetric) {
      case "registrations": return "registrations";
      case "verifiedUsers": return "verified";
      case "profileCompletedUsers": return "profile";
      case "activeUsers": return "active";
      default: return "registrations";
    }
  };

  const getMetricIcon = () => {
    switch(selectedMetric) {
      case "registrations": return "📝";
      case "verifiedUsers": return "✅";
      case "profileCompletedUsers": return "📊";
      case "activeUsers": return "⚡";
      default: return "📝";
    }
  };

  const getGroupByLabel = () => {
    switch(groupBy) {
      case "day": return "Daily";
      case "week": return "Weekly";
      case "month": return "Monthly";
      default: return "Weekly";
    }
  };

  // Format Y-axis labels
  const getYAxisLabels = () => {
    const labels = [];
    for (let i = 0; i <= 4; i++) {
      const value = Math.round((i / 4) * maxValue);
      labels.push(value);
    }
    return labels;
  };

  if (loading) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_spinner}></div>
        <p>Loading user growth data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error_container}>
        <div className={styles.error_icon}>⚠️</div>
        <p>{error}</p>
        <button onClick={fetchUserGrowth} className={styles.retry_btn}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.growth_container}>
      {/* Header Section */}
      <div className={styles.header_section}>
        <div>
          <h1 className={styles.page_title}>User Growth Analytics</h1>
          <p className={styles.page_subtitle}>
            Track user registration trends and engagement metrics over time
          </p>
        </div>
        <div className={styles.header_actions}>
          <div className={styles.group_by_selector}>
            <button
              className={`${styles.group_btn} ${groupBy === "day" ? styles.active_group : ""}`}
              onClick={() => handleGroupByChange("day")}
            >
              Daily
            </button>
            <button
              className={`${styles.group_btn} ${groupBy === "week" ? styles.active_group : ""}`}
              onClick={() => handleGroupByChange("week")}
            >
              Weekly
            </button>
            <button
              className={`${styles.group_btn} ${groupBy === "month" ? styles.active_group : ""}`}
              onClick={() => handleGroupByChange("month")}
            >
              Monthly
            </button>
          </div>
          <div className={styles.date_filter}>
            <button
              className={styles.date_filter_btn}
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              📅 {startDate || endDate ? "Date Range" : "All Time"}
              {(startDate || endDate) && <span className={styles.filter_active_dot}></span>}
            </button>
            {showDatePicker && (
              <div className={styles.date_picker_dropdown}>
                <div className={styles.date_picker_header}>
                  <span>Select Date Range</span>
                  <button onClick={resetDateRange} className={styles.reset_date_btn}>
                    Reset
                  </button>
                </div>
                <div className={styles.date_input_group}>
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className={`${styles.date_input} ${dateError ? styles.date_input_error : ""}`}
                  />
                </div>
                <div className={styles.date_input_group}>
                  <label>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className={`${styles.date_input} ${dateError ? styles.date_input_error : ""}`}
                  />
                </div>
                {dateError && (
                  <div className={styles.date_error_message}>
                    <span>⚠️</span> {dateError}
                  </div>
                )}
                <button 
                  onClick={applyDateRange} 
                  className={styles.apply_date_btn}
                  disabled={!!dateError}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className={styles.stats_grid}>
        <div className={`${styles.stat_card} ${styles.registrations_card}`}>
          <div className={styles.stat_icon}>📝</div>
          <div className={styles.stat_content}>
            <p className={styles.stat_label}>Total Registrations</p>
            <h2 className={styles.stat_value}>{stats.totalRegistrations.toLocaleString()}</h2>
          </div>
          <div className={styles.stat_trend}>
            <span className={styles.trend_up}>Peak: {stats.peakRegistrations}</span>
          </div>
        </div>

        <div className={`${styles.stat_card} ${styles.verified_card}`}>
          <div className={styles.stat_icon}>✅</div>
          <div className={styles.stat_content}>
            <p className={styles.stat_label}>Verified Users</p>
            <h2 className={styles.stat_value}>{stats.totalVerified.toLocaleString()}</h2>
          </div>
          <div className={styles.stat_trend}>
            <span className={styles.percentage}>{stats.verificationRate.toFixed(1)}%</span>
          </div>
        </div>

        <div className={`${styles.stat_card} ${styles.profile_card}`}>
          <div className={styles.stat_icon}>📊</div>
          <div className={styles.stat_content}>
            <p className={styles.stat_label}>Profile Completed</p>
            <h2 className={styles.stat_value}>{stats.totalProfileCompleted.toLocaleString()}</h2>
          </div>
          <div className={styles.stat_trend}>
            <span className={styles.percentage}>{stats.profileCompletionRate.toFixed(1)}%</span>
          </div>
        </div>

        <div className={`${styles.stat_card} ${styles.active_card}`}>
          <div className={styles.stat_icon}>⚡</div>
          <div className={styles.stat_content}>
            <p className={styles.stat_label}>Avg Active Users</p>
            <h2 className={styles.stat_value}>{stats.avgActiveUsers.toLocaleString()}</h2>
          </div>
          <div className={styles.stat_trend}>
            <span className={styles.trend_label}>per {getGroupByLabel().toLowerCase()}</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className={styles.chart_section}>
        <div className={styles.chart_header}>
          <h3 className={styles.chart_title}>
            <span className={styles.chart_icon}>{getMetricIcon()}</span>
            {getMetricLabel()} Trends ({getGroupByLabel()})
          </h3>
          <div className={styles.metric_selector}>
            <button
              className={`${styles.metric_btn} ${selectedMetric === "registrations" ? styles.active_metric : ""}`}
              onClick={() => setSelectedMetric("registrations")}
            >
              📝 Registrations
            </button>
            <button
              className={`${styles.metric_btn} ${selectedMetric === "verifiedUsers" ? styles.active_metric : ""}`}
              onClick={() => setSelectedMetric("verifiedUsers")}
            >
              ✅ Verified
            </button>
            <button
              className={`${styles.metric_btn} ${selectedMetric === "profileCompletedUsers" ? styles.active_metric : ""}`}
              onClick={() => setSelectedMetric("profileCompletedUsers")}
            >
              📊 Profile
            </button>
            <button
              className={`${styles.metric_btn} ${selectedMetric === "activeUsers" ? styles.active_metric : ""}`}
              onClick={() => setSelectedMetric("activeUsers")}
            >
              ⚡ Active
            </button>
          </div>
        </div>
                
        <div className={styles.chart_container}>
          <div className={styles.chart_y_axis}>
            {getYAxisLabels().reverse().map((label, idx) => (
              <div key={idx} className={styles.y_axis_label}>
                {label.toLocaleString()}
              </div>
            ))}
          </div>
          <div className={styles.chart_bars_container}>
            {growthData?.points?.map((point, index) => {
              let value = 0;
              switch(selectedMetric) {
                case "registrations":
                  value = point.registrations || 0;
                  break;
                case "verifiedUsers":
                  value = point.verifiedUsers || 0;
                  break;
                case "profileCompletedUsers":
                  value = point.profileCompletedUsers || 0;
                  break;
                case "activeUsers":
                  value = point.activeUsers || 0;
                  break;
                default:
                  value = point.registrations || 0;
              }
              const heightPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
              
              // Calculate the position for the number (at the top of the bar)
              const barHeight = heightPercentage;
              
              return (
                <div key={index} className={styles.bar_wrapper}>
                  <div className={styles.bar_container}>
                    <div
                      className={`${styles.bar} ${styles[getMetricColor()]}`}
                      style={{ height: `${heightPercentage}%` }}
                    />
                    {value > 0 && (
                      <div 
                        className={styles.bar_number}
                        style={{ bottom: `${barHeight}%` }}
                      >
                        {value}
                      </div>
                    )}
                  </div>
                  <div className={styles.bar_label} title={point.periodLabel}>
                    {point.periodLabel.split(" - ")[0].slice(5)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
          
        {growthData?.startDate && growthData?.endDate && (
          <div className={styles.chart_footer}>
            Data from {new Date(growthData.startDate).toLocaleDateString()} to {new Date(growthData.endDate).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Detailed Data Table */}
      <div className={styles.table_section}>
        <div className={styles.table_header}>
          <h3 className={styles.table_title}>Detailed Breakdown by {getGroupByLabel()}</h3>
          <p className={styles.table_subtitle}>
            Period: {growthData?.startDate ? new Date(growthData.startDate).toLocaleDateString() : "Start"} - {growthData?.endDate ? new Date(growthData.endDate).toLocaleDateString() : "End"}
          </p>
        </div>
        <div className={styles.table_container}>
          <table className={styles.data_table}>
            <thead>
              <tr>
                <th>Period</th>
                <th>📝 Registrations</th>
                <th>✅ Verified</th>
                <th>📊 Profile Completed</th>
                <th>⚡ Active Users</th>
                <th>Verification Rate</th>
              </tr>
            </thead>
            <tbody>
              {growthData?.points?.map((point, index) => {
                const verificationRate = point.registrations > 0 
                  ? ((point.verifiedUsers / point.registrations) * 100).toFixed(1)
                  : 0;
                return (
                  <tr key={index} className={styles.table_row}>
                    <td className={styles.period_cell}>{point.periodLabel}</td>
                    <td className={styles.registrations_cell}>{point.registrations || 0}</td>
                    <td className={styles.verified_cell}>{point.verifiedUsers || 0}</td>
                    <td className={styles.profile_cell}>{point.profileCompletedUsers || 0}</td>
                    <td className={styles.active_cell}>{point.activeUsers || 0}</td>
                    <td className={verificationRate >= 70 ? styles.high_rate : verificationRate >= 40 ? styles.medium_rate : styles.low_rate}>
                      {verificationRate}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {growthData?.points?.length === 0 && (
          <div className={styles.no_data_message}>
            <span>📊</span>
            <p>No data available for the selected period</p>
          </div>
        )}
      </div>

      {/* Insights Section */}
      {stats.totalRegistrations > 0 && (
        <div className={styles.insights_section}>
          <h3 className={styles.insights_title}>📈 Key Insights</h3>
          <div className={styles.insights_grid}>
            <div className={styles.insight_card}>
              <div className={styles.insight_icon}>🏆</div>
              <div className={styles.insight_content}>
                <p className={styles.insight_label}>Peak Registration Period</p>
                <p className={styles.insight_value}>{stats.peakRegistrationPeriod || "N/A"}</p>
                <p className={styles.insight_desc}>{stats.peakRegistrations} new users registered</p>
              </div>
            </div>
            <div className={styles.insight_card}>
              <div className={styles.insight_icon}>✅</div>
              <div className={styles.insight_content}>
                <p className={styles.insight_label}>Overall Verification Rate</p>
                <p className={styles.insight_value}>{stats.verificationRate.toFixed(1)}%</p>
                <p className={styles.insight_desc}>{stats.totalVerified} out of {stats.totalRegistrations} users verified</p>
              </div>
            </div>
            <div className={styles.insight_card}>
              <div className={styles.insight_icon}>📊</div>
              <div className={styles.insight_content}>
                <p className={styles.insight_label}>Profile Completion Rate</p>
                <p className={styles.insight_value}>{stats.profileCompletionRate.toFixed(1)}%</p>
                <p className={styles.insight_desc}>{stats.totalProfileCompleted} users completed their profiles</p>
              </div>
            </div>
            <div className={styles.insight_card}>
              <div className={styles.insight_icon}>⚡</div>
              <div className={styles.insight_content}>
                <p className={styles.insight_label}>Average Activity</p>
                <p className={styles.insight_value}>{stats.avgActiveUsers}</p>
                <p className={styles.insight_desc}>active users per {getGroupByLabel().toLowerCase()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserGrowth;