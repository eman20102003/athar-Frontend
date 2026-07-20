import { useEffect, useState } from "react";
import { getAllReviews, deleteReviewAdmin } from "../../api/adminApi";
import { toast } from "react-toastify";
import "./ReviewsManager.css";

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);

  const load = () => getAllReviews({ page: 1, limit: 50 }).then(({ data }) => setReviews(data.reviews));

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("حذف هذا التعليق؟")) return;
    await deleteReviewAdmin(id);
    toast.success("تم الحذف");
    load();
  };

  if (!reviews.length) return <p className="text-muted">لا توجد تعليقات بعد</p>;

  return (
    <div className="reviews-manager">
      <h1>التعليقات</h1>
      <div className="reviews-manager__list">
        {reviews.map((r) => (
          <div key={r._id} className="reviews-manager__item">
            <div>
              <strong>{r.user?.name}</strong> على <em>{r.book?.title}</em>
              <p>{r.comment}</p>
            </div>
            <button onClick={() => handleDelete(r._id)}>حذف</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsManager;