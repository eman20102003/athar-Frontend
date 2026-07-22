import { useEffect, useState } from "react";
import { getAllReviews, deleteReviewAdmin } from "../../api/adminApi";
import { toast } from "react-toastify";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import EmptyState from "../../components/common/EmptyState";
import "./ReviewsManager.css";

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); 

const load = () => 
  getAllReviews({ page: 1, limit: 50 })
    .then(({ data }) => setReviews(data.reviews))
    .catch((err) => {
      console.error(err);
      toast.error("تعذر تحميل التعليقات");
    });

  useEffect(() => {
    load();
  }, []);

  const handleDeleteConfirmed = async () => {
    await deleteReviewAdmin(confirmDeleteId);
    toast.success("تم الحذف");
    setConfirmDeleteId(null);
    load();
  };

  if (!reviews.length) {
    return (
      <div className="reviews-manager">
        <h1>التعليقات</h1>
        <EmptyState title="لا توجد تعليقات بعد" message="التعليقات على الكتب ستظهر هنا فور إضافتها" />
      </div>
    );
  }

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
            <button onClick={() => setConfirmDeleteId(r._id)}>حذف</button>
          </div>
        ))}
      </div>

      {confirmDeleteId && (
        <ConfirmDialog
          message="حذف هذا التعليق؟"
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ReviewsManager;