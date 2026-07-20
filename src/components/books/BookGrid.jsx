import BookCard from "./BookCard";
import EmptyState from "../common/EmptyState";
import "../../styles/books/BookGrid.css";

const BookGrid = ({ books, emptyTitle, emptyMessage }) => {
  if (!books || !books.length) {
    return (
      <EmptyState
        title={emptyTitle || "لا توجد كتب"}
        message={emptyMessage || "جرّب تعديل معايير البحث أو الفلترة"}
      />
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => <BookCard key={book._id} book={book} />)}
    </div>
  );
};

export default BookGrid;