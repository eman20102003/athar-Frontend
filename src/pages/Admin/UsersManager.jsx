import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/adminApi";
import UsersTable from "../../components/admin/UsersTable";
import "./UsersManager.css";

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsers({ page: 1, limit: 50, search }).then(({ data }) => setUsers(data.users));
  }, [search]);

  return (
    <div className="users-manager">
      <div className="users-manager__header">
        <h1>المستخدمون</h1>
        <input
          className="users-manager__search"
          placeholder="ابحث بالاسم أو البريد..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <UsersTable users={users} />
    </div>
  );
};

export default UsersManager;