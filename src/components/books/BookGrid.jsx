import BookCard from "./BookCard";
import EmptyState from "../common/EmptyState";
import "../../styles/BookGrid.css";

const BookGrid = ({ books }) => {
  if (!books || !books.length) {
    return <EmptyState title="لا توجد كتب" message="جرب تعديل معايير البحث أو الفلترة" />;
  }

  return (
    <div className="book-grid">
      {books.map((book) => <BookCard key={book._id} book={book} />)}
    </div>
  );
};

export default BookGrid;