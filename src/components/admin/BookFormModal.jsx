import { useState } from "react";
import { createBook, updateBook } from "../../api/booksApi";
import { toast } from "react-toastify";
import "../../styles/admin/BookFormModal.css";

const BookFormModal = ({ book, categories, onClose, onSaved }) => {
  const isEditing = !!book;

  const [form, setForm] = useState({
    title: book?.title || "",
    author: book?.author || "",
    description: book?.description || "",
    price: book?.price || 0,
    category: book?.category?._id || "",
    language: book?.language || "العربية",
    pages: book?.pages || "",
    isFree: book?.isFree || false,
    isFeatured: book?.isFeatured || false,
  });
  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [saving, setSaving] = useState(false);

  const update = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing && (!cover || !pdf)) {
      toast.error("يجب رفع صورة الغلاف وملف PDF عند إضافة كتاب جديد");
      return;
    }

    setSaving(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (cover) formData.append("cover", cover);
    if (pdf) formData.append("pdf", pdf);

    try {
      if (isEditing) {
        await updateBook(book._id, formData);
        toast.success("تم تحديث الكتاب");
      } else {
        await createBook(formData);
        toast.success("تم إضافة الكتاب");
      }
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="book-modal__overlay" onClick={onClose}>
      <form className="book-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{isEditing ? "تعديل الكتاب" : "إضافة كتاب جديد"}</h2>

        <label className="book-modal__label">
          العنوان
          <input className="book-modal__input" value={form.title} onChange={(e) => update("title", e.target.value)} required />
        </label>

        <label className="book-modal__label">
          المؤلف
          <input className="book-modal__input" value={form.author} onChange={(e) => update("author", e.target.value)} required />
        </label>

        <label className="book-modal__label">
          الوصف
          <textarea className="book-modal__textarea" value={form.description} onChange={(e) => update("description", e.target.value)} required />
        </label>

        <div className="book-modal__row">
          <label className="book-modal__label">
            السعر ($)
            <input type="number" min="0" className="book-modal__input" value={form.price} onChange={(e) => update("price", e.target.value)} />
          </label>

          <label className="book-modal__label">
            عدد الصفحات
            <input type="number" min="1" className="book-modal__input" value={form.pages} onChange={(e) => update("pages", e.target.value)} required />
          </label>
        </div>

        <label className="book-modal__label">
          التصنيف
          <select className="book-modal__input" value={form.category} onChange={(e) => update("category", e.target.value)} required>
            <option value="">اختار تصنيفًا</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </label>

        <label className="book-modal__label">
          اللغة
          <input className="book-modal__input" value={form.language} onChange={(e) => update("language", e.target.value)} />
        </label>

        <div className="book-modal__checks">
          <label className="book-modal__check">
            <input type="checkbox" checked={form.isFree} onChange={(e) => update("isFree", e.target.checked)} />
            كتاب مجاني
          </label>

          <label className="book-modal__check">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} />
            كتاب مميز
          </label>
        </div>

        <label className="book-modal__label">
          صورة الغلاف {isEditing && "(اختياري، اتركه فارغًا للإبقاء على الصورة الحالية)"}
          <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files[0])} />
        </label>

        <label className="book-modal__label">
          ملف PDF {isEditing && "(اختياري، اتركه فارغًا للإبقاء على الملف الحالي)"}
          <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} />
        </label>

        <div className="book-modal__footer">
          <button type="button" className="book-modal__cancel" onClick={onClose}>إلغاء</button>
          <button type="submit" className="book-modal__submit" disabled={saving}>
            {saving ? "جاري الحفظ..." : isEditing ? "حفظ التعديلات" : "إضافة الكتاب"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookFormModal;