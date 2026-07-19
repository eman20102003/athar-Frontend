import { addBookmark } from "../../api/readerApi";
import { toast } from "react-toastify";
import "../../styles/reader/ReaderToolbar.css";

const ReaderToolbar = ({ pageNumber, numPages, onPrev, onNext, bookId, currentPage, activeTab, onTabChange }) => {
  const handleBookmark = async () => {
    await addBookmark({ bookId, page: currentPage, label: "" });
    toast.success("تمت إضافة إشارة مرجعية");
  };

  return (
    <div className="reader-toolbar">
      <div className="reader-toolbar__nav">
        <button className="reader-toolbar__btn" onClick={onPrev}>السابق</button>
        <span className="reader-toolbar__page">صفحة {pageNumber} من {numPages || "..."}</span>
        <button className="reader-toolbar__btn" onClick={onNext}>التالي</button>
        <button className="reader-toolbar__btn reader-toolbar__btn--accent" onClick={handleBookmark}>🔖</button>
      </div>

      <div className="reader-toolbar__tabs">
  <button className={`reader-toolbar__tab ${activeTab === "bookmarks" ? "reader-toolbar__tab--active" : ""}`} onClick={() => onTabChange("bookmarks")}>الإشارات</button>
  <button className={`reader-toolbar__tab ${activeTab === "highlights" ? "reader-toolbar__tab--active" : ""}`} onClick={() => onTabChange("highlights")}>التظليل</button>
  <button className={`reader-toolbar__tab ${activeTab === "notes" ? "reader-toolbar__tab--active" : ""}`} onClick={() => onTabChange("notes")}>الملاحظات</button>
  <button className={`reader-toolbar__tab ${activeTab === "ai" ? "reader-toolbar__tab--active" : ""}`} onClick={() => onTabChange("ai")}>اسأل أثر</button>
</div>
    </div>
  );
};

export default ReaderToolbar;