import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { getCategories } from "../../api/booksApi";
import { toast } from "react-toastify";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import "./CategoriesManager.css";

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); 

  const load = () => getCategories().then(({ data }) => setCategories(data.categories));

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await axiosInstance.post("/categories", { name });
      toast.success("تم إضافة التصنيف");
      setName("");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ");
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axiosInstance.delete(`/categories/${confirmDeleteId}`);
      toast.success("تم الحذف");
      setConfirmDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ");
      setConfirmDeleteId(null); 
    }
  };

  return (
    <div className="categories-manager">
      <h1>التصنيفات</h1>

      <form className="categories-manager__form" onSubmit={handleAdd}>
        <input
          className="categories-manager__input"
          placeholder="اسم التصنيف الجديد..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="categories-manager__add">إضافة</button>
      </form>

      <div className="categories-manager__list">
        {categories.map((c) => (
          <div key={c._id} className="categories-manager__item">
            <span>{c.name}</span>
            <button onClick={() => setConfirmDeleteId(c._id)}>حذف</button>
          </div>
        ))}
      </div>

      {confirmDeleteId && (
        <ConfirmDialog
          message="هل أنت متأكدة من حذف هذا التصنيف؟"
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default CategoriesManager;