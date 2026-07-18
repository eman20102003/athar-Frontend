import { Link } from "react-router-dom";
import { getFileUrl } from "../../utils/getFileUrl";
import "../../styles/BookCard.css";

const BookCard = ({ book }) => (
  <Link to={`/books/${book._id}`} className="book-card">
    <div className="book-card__cover-wrapper">
      <img src={getFileUrl(book.coverImage)} alt={book.title} className="book-card__cover" />
      {book.isFree && <span className="book-card__badge">مجاني</span>}
    </div>

    <div className="book-card__info">
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>

      <div className="book-card__footer">
        <span className="book-card__price">
          {book.isFree ? "مجاني" : `$${book.price}`}
        </span>
        <span className="book-card__rating">⭐ {book.rating || "جديد"}</span>
      </div>
    </div>
  </Link>
);

export default BookCard;