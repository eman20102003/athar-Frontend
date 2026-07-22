import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBook } from "../../hooks/useBook";
import { getBookFile, toggleFavorite, getFavorites, getPurchasedBooks } from "../../api/libraryApi";
import { useAuth } from "../../context/AuthContext";
import { getFileUrl } from "../../utils/getFileUrl";
import { toast } from "react-toastify";
import ReviewsList from "../../components/reviews/ReviewsList";
import ReviewForm from "../../components/reviews/ReviewForm";
import SignatureDivider from "../../components/common/SignatureDivider";
import Loader from "../../components/common/Loader";
import "./BookDetails.css";
import { Star, BookOpen, Globe, Heart, Download, ShoppingCart, PlayCircle } from "lucide-react"; 


const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: book, isLoading } = useBook(id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOwned, setIsOwned] = useState(false); 
  const [reviewsKey, setReviewsKey] = useState(0);

  useEffect(() => {
    if (!user) return;
    getFavorites().then(({ data }) => {
      const found = data.favorites.some((f) => f.book._id === id);
      setIsFavorite(found);
    });
    getPurchasedBooks().then(({ data }) => {
      const owned = data.books.some((b) => b._id === id);
      setIsOwned(owned);
    });
  }, [id, user]);

  if (isLoading || !book) return <Loader />;
  const canDownload = book.isFree || isOwned;

  const handleFavorite = async () => {
    const { data } = await toggleFavorite(id);
    setIsFavorite(data.isFavorite);
  };
  const handleDownload = async () => {
    try {
      const res = await getBookFile(id, "download");
      const url = URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${book.title}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("يجب شراء الكتاب أولاً للتحميل");
      }
    }
  };

  return (
    <div className="book-details">
      <div className="book-details__hero">
        <img src={getFileUrl(book.coverImage)} alt={book.title} className="book-details__cover" />
        <div className="book-details__info">
          <h1 className="book-details__title">{book.title}</h1>
          <p className="book-details__author">بقلم {book.author}</p>
          <div className="book-details__meta">
  <span><BookOpen size={15} /> {book.pages} صفحة</span>
  <span><Globe size={15} /> {book.language}</span>
  <span><Star size={15} className="book-details__star" /> {book.rating || "جديد"}</span>
</div>
          <p className="book-details__description">{book.description}</p>
      <div className="book-details__actions">
  {(book.isFree || isOwned) ? (
    <button className="book-details__btn book-details__btn--primary" onClick={() => navigate(`/reader/${id}`)}>
      <PlayCircle size={18} /> قراءة الآن
    </button>
  ) : (
    <button className="book-details__btn book-details__btn--primary" onClick={() => navigate(`/checkout/${id}`)}>
      <ShoppingCart size={18} /> شراء ${book.price}
    </button>
  )}

  {canDownload && (
    <button className="book-details__btn book-details__btn--outline" onClick={handleDownload}>
      <Download size={18} /> تحميل PDF
    </button>
  )}

  {user && (
    <button className="book-details__btn book-details__btn--outline" onClick={handleFavorite}>
      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} /> {isFavorite ? "في المفضلة" : "أضف للمفضلة"}
    </button>
  )}
</div>
        </div>
      </div>
      <SignatureDivider label="آراء القرّاء" />
     <ReviewsList key={reviewsKey} bookId={id} />
    {user && <ReviewForm bookId={id} onSuccess={() => setReviewsKey((k) => k + 1)} />}
    </div>
  );
};

export default BookDetails;