import BookCard from "./BookCard";
import "./BookGrid.css";

const BookGrid = ({ books = [] }) => {
  if (!books.length) {
    return (
      <div className="book-grid__empty">
        لا توجد كتب حالياً
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
        />
      ))}
    </div>
  );
};

export default BookGrid;