import { useEffect, useState } from "react";
import { getDashboardSummary, getAllUsers } from "../../api/adminApi";
import DashboardCards from "../../components/admin/DashboardCards";
import UsersTable from "../../components/admin/UsersTable";
import "./Dashboard.css";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDashboardSummary().then(({ data }) => setSummary(data.summary));
    getAllUsers({ page: 1, limit: 20 }).then(({ data }) => setUsers(data.users));
  }, []);

  if (!summary) return null;

  return (
    <div className="admin-dashboard">
      <h1>لوحة التحكم</h1>
      <DashboardCards summary={summary} />
      <h2 style={{ marginTop: "var(--space-7)" }}>المستخدمون</h2>
      <UsersTable users={users} />
    </div>
  );
};

export default Dashboard;