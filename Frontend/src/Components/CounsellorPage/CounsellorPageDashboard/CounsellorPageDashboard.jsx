import React from "react";
import "./CounsellorPageDashboard.css";
import { Calendar, Clock, Users, BarChart3, TrendingUp } from "lucide-react";

const CounsellorPageDashboard = () => {
  const stats = [
    {
      title: "Today's Appointments",
      value: "6",
      change: "+2",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Pending Sessions",
      value: "3",
      change: "-1",
      trend: "down",
      icon: Clock,
    },
    {
      title: "Total Patients",
      value: "34",
      change: "+5",
      trend: "up",
      icon: Users,
    },
    {
      title: "This Week's Sessions",
      value: "18",
      change: "+3",
      trend: "up",
      icon: BarChart3,
    },
  ];

  const todaysSessions = [
    {
      id: 1,
      patientName: "Pending",
      time: "2:00 PM",
      type: "Anxiety Support",
      status: "confirmed",
      stage: "Moderate",
    },
    {
      id: 2,
      patientName: "Compeletion",
      time: "3:30 PM",
      type: "Individual Therapy",
      status: "confirmed",
      stage: "Mild",
    },
    {
      id: 3,
      patientName: "Pending",
      time: "4:45 PM",
      type: "PTSD Session",
      status: "pending",
      stage: "At Risk",
    },
    {
      id: 4,
      patientName: "Pending",
      time: "5:45 PM",
      type: "Stress Session",
      status: "pending",
      stage: "Moderate",
    }
  ];

  return (
    <div className="dashboard-page">
      
     <div className="text-section">
       <p className="dashboard-quote">
        "All data is 100% anonymous and aggregated to protect student privacy."
      </p>
     </div>

    <div className="dashboard-row">
       
        <div className="dashboard-cards">
  {stats.map((item, idx) => {
    const Icon = item.icon;
    return (
      <div key={idx} className="dashboard-card">

        
        
        <div className="dashboard-card-right">
          <p className="dashboard-card-title">{item.title}</p>
          <p className="dashboard-card-number">{item.value}</p>
          
          <span
            className={`dashboard-card-subtext ${
              item.trend === "up" ? "positive" : "negative"
            }`}
          >
            {item.change}
          </span>
        </div>
        <div className="dashboard-card-left">
          <Icon className="icon" size={36} />
        </div>

      </div>
    );
  })}
</div>


       
        <div className="sessions-box">
          <h2 className="sessions-title">Today's Sessions</h2>
          <div className="sessions-list">
            {todaysSessions.map((session) => (
              <div key={session.id} className="session-card">
                <div className="session-box-item">
                  <div className="right-side-session-box">
                  <h3>{session.patientName}</h3>
                  <p>{session.type}</p>
                </div>
                <div className="left-side-session-box">
                  <span className="time">{session.time}</span>
                  <span className="stage">{session.stage}</span>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="insights-card">
          <div className="insights-header">
            <TrendingUp className="icon" size={22} />
            <h3>This Week's Insights</h3>
          </div>
          <div className="insights-content">
            <div className="insight-row">
              <span>Improvement Rate</span>
              <span>85%</span>
            </div>
            <div className="insight-row">
              <span>Session Completion</span>
              <span>94%</span>
            </div>
            <div className="insight-row">
              <span>Patient Satisfaction</span>
              <span>4.8/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorPageDashboard;