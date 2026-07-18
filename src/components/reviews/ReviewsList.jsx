import { useEffect, useState } from "react";
import { getReviews } from "../../api/reviewsApi";
import { formatDate } from "../../utils/formatDate";
import EmptyState from "../common/EmptyState";
import "../../styles/reviews/ReviewsList.css";

const ReviewsList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(bookId).then(({ data }) => setReviews(data.reviews));
  }, [bookId]);

  if (!reviews.length) {
    return <EmptyState title="لا توجد تقييمات بعد" message="كون أول من يشارك رأيها بهذا الكتاب" />;
  }

  return (
    <div className="reviews-list">
      {reviews.map((r) => (
        <div key={r._id} className="reviews-list__item">
          <div className="reviews-list__header">
            <span className="reviews-list__name">{r.user?.name}</span>
            <span className="reviews-list__stars">{"⭐".repeat(r.rating)}</span>
          </div>
          {r.comment && <p className="reviews-list__comment">{r.comment}</p>}
          <span className="reviews-list__date">{formatDate(r.createdAt)}</span>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;