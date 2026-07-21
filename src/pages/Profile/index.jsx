import { useState, useEffect } from "react";
import { User, Mail, BookOpen, Heart, ShoppingBag, Edit2, Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/authApi";
import { getPurchasedBooks, getFavorites, getContinueReading } from "../../api/libraryApi";
import { toast } from "react-toastify";
import Loader from "../../components/common/Loader";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([getPurchasedBooks(), getFavorites(), getContinueReading()]).then(
      ([purchased, favorites, reading]) => {
        setStats({
          purchasedCount: purchased.data.books.length,
          favoritesCount: favorites.data.favorites.length,
          readingCount: reading.data.progress.length,
        });
      }
    );
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      toast.success("تم تحديث بياناتك بنجاح");
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ");
    } finally {
      setSaving(false);
    }
  };

  if (!stats) return <Loader />;

  return (
    <div className="profile">
      <div className="profile__hero">
        <div className="profile__avatar">{user?.name?.charAt(0) || "؟"}</div>
        <div>
          <h1 className="profile__name">{user?.name}</h1>
          <p className="profile__joined">عضوة في مجتمع أثر</p>
        </div>
      </div>

      <div className="profile__stats">
        <div className="profile__stat-card">
          <ShoppingBag size={22} className="profile__stat-icon" />
          <span className="profile__stat-value">{stats.purchasedCount}</span>
          <span className="profile__stat-label">كتاب مشترى</span>
        </div>
        <div className="profile__stat-card">
          <BookOpen size={22} className="profile__stat-icon" />
          <span className="profile__stat-value">{stats.readingCount}</span>
          <span className="profile__stat-label">قيد القراءة</span>
        </div>
        <div className="profile__stat-card">
          <Heart size={22} className="profile__stat-icon" />
          <span className="profile__stat-value">{stats.favoritesCount}</span>
          <span className="profile__stat-label">بالمفضلة</span>
        </div>
      </div>

      <div className="profile__card">
        <div className="profile__card-header">
          <h2>بياناتي الشخصية</h2>
          {!editing && (
            <button className="profile__edit-btn" onClick={() => setEditing(true)}>
              <Edit2 size={16} /> تعديل
            </button>
          )}
        </div>

        {editing ? (
          <form className="profile__form" onSubmit={handleSave}>
            <label className="profile__label">
              <User size={16} /> الاسم
              <input
                className="profile__input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>

            <label className="profile__label">
              <Mail size={16} /> البريد الإلكتروني
              <input
                type="email"
                className="profile__input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>

            <div className="profile__form-actions">
              <button type="submit" className="profile__save-btn" disabled={saving}>
                <Save size={16} /> {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
              <button
                type="button"
                className="profile__cancel-btn"
                onClick={() => { setEditing(false); setForm({ name: user.name, email: user.email }); }}
              >
                <X size={16} /> إلغاء
              </button>
            </div>
          </form>
        ) : (
          <div className="profile__info">
            <p><User size={16} /> {user?.name}</p>
            <p><Mail size={16} /> {user?.email}</p>
          </div>
        )}
      </div>

      <div className="profile__quote">
        <span className="profile__quote-mark">❧</span>
        <p>"كل كتاب تقرأه يترك فيك أثرًا، وكل أثر يستحق أن يُروى"</p>
      </div>
    </div>
  );
};

export default Profile;