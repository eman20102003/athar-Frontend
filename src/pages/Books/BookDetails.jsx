import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../../api/booksApi";
import { toggleFavorite } from "../../api/libraryApi";
import { useAuth } from "../../context/AuthContext";
import { getFileUrl } from "../../utils/getFileUrl";
import ReviewsList from "../../components/reviews/ReviewsList";
import ReviewForm from "../../components/reviews/ReviewForm";
import SignatureDivider from "../../components/common/SignatureDivider";
import Loader from "../../components/common/Loader";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getBook(id).then(({ data }) => setBook(data.book));
  }, [id]);

  if (!book) return <Loader />;

  const handleFavorite = async () => {
    const { data } = await toggleFavorite(id);
    setIsFavorite(data.isFavorite);
  };

  return (
    <div className="book-details">
      <div className="book-details__hero">
        <img src={getFileUrl(book.coverImage)} alt={book.title} className="book-details__cover" />

        <div className="book-details__info">
          <h1 className="book-details__title">{book.title}</h1>
          <p className="book-details__author">بقلم {book.author}</p>
          <p className="book-details__meta">
            {book.pages} صفحة · {book.language} · ⭐ {book.rating || "جديد"}
          </p>
          <p className="book-details__description">{book.description}</p>

          <div className="book-details__actions">
            {book.isFree ? (
              <button className="book-details__btn book-details__btn--primary" onClick={() => navigate(`/reader/${id}`)}>
                قراءة الآن
              </button>
            ) : (
              <button className="book-details__btn book-details__btn--primary" onClick={() => navigate(`/checkout/${id}`)}>
                شراء ${book.price}
              </button>
            )}

            {user && (
              <button className="book-details__btn book-details__btn--outline" onClick={handleFavorite}>
                {isFavorite ? "♥ في المفضلة" : "♡ أضف للمفضلة"}
              </button>
            )}
          </div>
        </div>
      </div>

      <SignatureDivider label="آراء القرّاء" />

      <ReviewsList bookId={id} />
      {user && <ReviewForm bookId={id} />}
    </div>
  );
};

export default BookDetails;