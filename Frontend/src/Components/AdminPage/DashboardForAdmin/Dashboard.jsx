import React from "react";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, Legend, ResponsiveContainer
} from "recharts";
import "./Dashboard.css";

// Dummy Data
const pieData = [
  { name: "Students", value: 12000 },
  { name: "Counselors", value: 100 },
  { name: "Languages", value: 8 },
  { name: "Anonymous Insights", value: 100 },
];

const lineData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 800 },
  { month: "Mar", users: 1500 },
  { month: "Apr", users: 2200 },
  { month: "May", users: 3000 },
];

const barData = [
  { stage: "Awareness", count: 5000 },
  { stage: "Consultation", count: 3200 },
  { stage: "Therapy", count: 1800 },
  { stage: "Recovery", count: 900 },
];

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#EF4444"];

const Dashboard = ({ darkMode }) => {
  return (
    <div className={`db-page ${darkMode ? "db-dark" : "db-light"}`}>
      {/* Header */}
      <div className="db-header">
        <h1>Admin Dashboard</h1>
        <p>Insights into students, counselors, and psychological support stages</p>
      </div>

      {/* Charts Section */}
      <div className="db-analytics">
        <div className="db-row">
          {/* Pie Chart */}
          <div className="db-card">
            <h3>User Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={70}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="db-card">
            <h3>Monthly User Growth</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="db-card">
            <h3>Psychological Support Stages</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="db-second-part"> <div className="db-box"> <h3>Quick Insights</h3> <ul className="db-insights"> <li>🚀 Student participation has increased by 35% this quarter</li> <li>🧑‍⚕️ More counselors are joining from Tier-2 cities</li> <li>🌐 Support expanded into 3 new regional languages</li> <li>🔒 Data remains fully anonymized and secure</li> </ul> </div> <div className="db-box"> <h3>Recent Activity</h3> <table className="db-table"> <thead> <tr> <th>Date</th> <th>User</th> <th>Action</th> <th>Status</th> </tr> </thead> <tbody> <tr> <td>23 Sept 2025</td> <td>Student #1021</td> <td>Requested Counseling</td> <td>Completed</td> </tr> <tr> <td>21 Sept 2025</td> <td>Counselor #56</td> <td>Uploaded Wellness Report</td> <td>Verified</td> </tr> <tr> <td>20 Sept 2025</td> <td>Student #982</td> <td>Feedback Submitted</td> <td>Pending</td> </tr> </tbody> </table> </div>
      </div>
    </div>
  );
};

export default Dashboard
