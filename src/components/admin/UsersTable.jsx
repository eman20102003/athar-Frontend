import { updateUserRole, deleteUser } from "../../api/adminApi";
import { toast } from "react-toastify";
import "../../styles/admin/UsersTable.css";

const UsersTable = ({ users }) => {
  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    toast.success("تم تحديث الصلاحية");
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنتِ متأكدة من حذف هذا المستخدم؟")) return;
    await deleteUser(id);
    toast.success("تم الحذف");
  };

  return (
    <table className="users-table">
      <thead>
        <tr><th>الاسم</th><th>البريد الإلكتروني</th><th>الصلاحية</th><th></th></tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>
              <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)} className="users-table__select">
                <option value="user">مستخدم</option>
                <option value="admin">أدمن</option>
              </select>
            </td>
            <td><button className="users-table__delete" onClick={() => handleDelete(u._id)}>حذف</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;