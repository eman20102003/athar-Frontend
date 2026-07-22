import { useEffect, useState } from "react";
import { getReviews, deleteReview, updateReview } from "../../api/reviewsApi";
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import EmptyState from "../common/EmptyState";
import "../../styles/reviews/ReviewsList.css";

const ReviewsList = ({ bookId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const load = () => getReviews(bookId).then(({ data }) => setReviews(data.reviews));

  useEffect(() => { load(); }, [bookId]);

  const handleDelete = async (id) => {
    await deleteReview(id);
    toast.success("تم حذف تقييمك");
    load();
  };

  const startEdit = (review) => {
    setEditingId(review._id);
    setEditText(review.comment || "");
  };

  const saveEdit = async (id, rating) => {
    await updateReview(id, { rating, comment: editText });
    toast.success("تم تحديث تقييمك");
    setEditingId(null);
    load();
  };

  if (!reviews.length) {
    return <EmptyState title="لا توجد تقييمات بعد" message="كون أول من يشارك رأيه بهذا الكتاب" />;
  }

  return (
    <div className="reviews-list">
      {reviews.map((r) => (
        <div key={r._id} className="reviews-list__item">
          <div className="reviews-list__header">
            <span className="reviews-list__name">{r.user?.name}</span>
            <span className="reviews-list__stars">{"⭐".repeat(r.rating)}</span>
          </div>

          {editingId === r._id ? (
            <div className="reviews-list__edit">
              <textarea
                className="reviews-list__edit-textarea"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="reviews-list__edit-actions">
                <button onClick={() => saveEdit(r._id, r.rating)}>حفظ</button>
                <button onClick={() => setEditingId(null)}>إلغاء</button>
              </div>
            </div>
          ) : (
            <>
              {r.comment && <p className="reviews-list__comment">{r.comment}</p>}
              <span className="reviews-list__date">{formatDate(r.createdAt)}</span>
            </>
          )}

         {String(user?._id || user?.id) === String(r.user?._id) && editingId !== r._id && (
           <div className="reviews-list__owner-actions">
              <button onClick={() => startEdit(r)}>تعديل</button>
              <button onClick={() => handleDelete(r._id)}>حذف</button>
                 </div>
)}
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;