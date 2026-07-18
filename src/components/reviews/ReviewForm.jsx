import { useState } from "react";
import { toast } from "react-toastify";
import { createReview } from "../../api/reviewsApi";
import "../../styles/ReviewForm.css";


const ReviewForm = ({ bookId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(bookId, { rating, comment });
      toast.success("تم إضافة تقييمك");
      setComment("");
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-form__title">شاركي رأيك</h3>

      <div className="review-form__stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            className={`review-form__star ${n <= rating ? "review-form__star--active" : ""}`}
            onClick={() => setRating(n)}
          >
            ⭐
          </button>
        ))}
      </div>

      <textarea
        className="review-form__textarea"
        placeholder="اكتب تعليقك (اختياري)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit" className="review-form__submit">إرسال التقييم</button>
    </form>
  );
};

export default ReviewForm;