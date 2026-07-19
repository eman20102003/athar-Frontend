import { useEffect, useState } from "react";
import { getPurchasedBooks } from "../../api/libraryApi";
import BookGrid from "../../components/books/BookGrid";
import SignatureDivider from "../../components/common/SignatureDivider";
import Loader from "../../components/common/Loader";
import "./Library.css";

const MyBooks = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    getPurchasedBooks().then(({ data }) => setBooks(data.books));
  }, []);

  if (!books) return <Loader />;

  return (
    <div className="library">
      <h1>مكتبتي</h1>
      <SignatureDivider />
      <BookGrid books={books} />
    </div>
  );
};

export default MyBooks;