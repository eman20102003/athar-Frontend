import { useEffect, useState } from "react";
import { getPurchasedBooks, getContinueReading } from "../../api/libraryApi";
import BookGrid from "../../components/books/BookGrid";
import ContinueReadingCard from "../../components/books/ContinueReadingCard";
import SignatureDivider from "../../components/common/SignatureDivider";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import "./Library.css";

const MyBooks = () => {
  const [purchased, setPurchased] = useState(null);
  const [continueReading, setContinueReading] = useState(null);

  useEffect(() => {
    getPurchasedBooks().then(({ data }) => setPurchased(data.books));
    getContinueReading().then(({ data }) => setContinueReading(data.progress));
  }, []);

  if (!purchased || !continueReading) return <Loader />;

  return (
    <div className="library">
      <h1>مكتبتي</h1>

      <SignatureDivider label="أكمل القراءة" />
      {continueReading.length > 0 ? (
        <div className="home__continue-row">
          {continueReading.map((p) => <ContinueReadingCard key={p._id} progress={p} />)}
        </div>
      ) : (
        <EmptyState title="لسه ما بدأت تقرأ" message="اختار كتابًا وابدئي القراءة ليظهر هنا" />
      )}

      <SignatureDivider label="كتبي المشتراة" />
      <BookGrid books={purchased} />
    </div>
  );
};

export default MyBooks;