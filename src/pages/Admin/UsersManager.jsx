import { useEffect, useState } from "react";
import { getAllUsers, createUserByAdmin } from "../../api/adminApi";
import { toast } from "react-toastify";
import UsersTable from "../../components/admin/UsersTable";
import "./UsersManager.css";

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const load = () => getAllUsers({ page: 1, limit: 50, search }).then(({ data }) => setUsers(data.users));

  useEffect(() => { load(); }, [search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createUserByAdmin(form);
      toast.success("تم إنشاء المستخدم");
      setForm({ name: "", email: "", password: "", role: "user" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <div className="users-manager">
      <div className="users-manager__header">
        <h1>المستخدمون</h1>
        <input className="users-manager__search" placeholder="ابحثي بالاسم أو البريد..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <form className="users-manager__form" onSubmit={handleCreate}>
        <input className="users-manager__input" placeholder="الاسم" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" className="users-manager__input" placeholder="البريد الإلكتروني" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" className="users-manager__input" placeholder="كلمة المرور" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={8} required />
        <select className="users-manager__input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="user">مستخدم</option>
          <option value="admin">أدمن</option>
        </select>
        <button type="submit" className="users-manager__add">+ إضافة مستخدم</button>
      </form>

      
      <UsersTable users={users} onChanged={load} />
    </div>
  );
};

export default UsersManager;