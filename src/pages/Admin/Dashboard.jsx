import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api/adminApi";
import DashboardCards from "../../components/admin/DashboardCards";
import "./Dashboard.css";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getDashboardSummary().then(({ data }) => setSummary(data.summary));
  }, []);

  if (!summary) return null;

  return (
    <div className="admin-dashboard">
      <h1>نظرة عامة</h1>
      <DashboardCards summary={summary} />
    </div>
  );
};

export default Dashboard;