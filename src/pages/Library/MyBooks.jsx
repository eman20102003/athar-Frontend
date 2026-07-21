import { useEffect, useState } from "react";
import { getPurchasedBooks, getContinueReading } from "../../api/libraryApi";
import BookGrid from "../../components/books/BookGrid";
import ContinueReadingCard from "../../components/books/ContinueReadingCard";
import SignatureDivider from "../../components/common/SignatureDivider";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import "./Library.css";
import { Library } from "lucide-react";

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
      <div className="library__header">
  <Library size={28} className="library__header-icon" />
  <div>
    <h1>مكتبتي</h1>
    <p className="text-muted">كل الكتب التي اقتنيتها أو بدأت قراءتها</p>
  </div>
</div>

      <SignatureDivider label="أكمل القراءة" />
      {continueReading.length > 0 ? (
        <div className="home__continue-row">
          {continueReading.map((p) => <ContinueReadingCard key={p._id} progress={p} />)}
        </div>
      ) : (
        <EmptyState title="لسه ما بدأت تقرأ" message="اختار كتابًا وابدأ القراءة ليظهر هنا" />
      )}

      <SignatureDivider label="كتبي المشتراة" />
      <BookGrid
         books={purchased}
         emptyTitle="لا توجد كتب مشتراة"
        emptyMessage="تصفّح المكتبة واشتري أول كتاب لك"
         />
    </div>
  );
};

export default MyBooks;