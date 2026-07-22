import { useState } from "react";
import { updateUserRole, deleteUser } from "../../api/adminApi";
import { toast } from "react-toastify";
import ConfirmDialog from "../common/ConfirmDialog";
import "../../styles/admin/UsersTable.css";

const UsersTable = ({ users, onChanged }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    toast.success("تم تحديث الصلاحية");
    onChanged(); 
  };

  const handleDeleteConfirmed = async () => {
    await deleteUser(confirmDeleteId);
    toast.success("تم الحذف");
    setConfirmDeleteId(null);
    onChanged();
  };

  return (
    <>
      <table className="users-table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الصلاحية</th>
            <th></th>
          </tr>
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
              <td>
                <button className="users-table__delete" onClick={() => setConfirmDeleteId(u._id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmDeleteId && (
        <ConfirmDialog
          message="هل أنت متأكدة من حذف هذا المستخدم؟"
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </>
  );
};

export default UsersTable;