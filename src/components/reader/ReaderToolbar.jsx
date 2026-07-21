import { useState } from "react";
import { addBookmark, addHighlight } from "../../api/readerApi";
import { toast } from "react-toastify";
import "../../styles/reader/ReaderToolbar.css";

const ReaderToolbar = ({
  pageNumber,
  numPages,
  onPrev,
  onNext,
  bookId,
  currentPage,
  activeTab,
  onTabChange,
  onHighlightAdded, 
}) => {
  const [showHighlightForm, setShowHighlightForm] = useState(false);
  const [highlightText, setHighlightText] = useState("");
  const [highlightColor, setHighlightColor] = useState("#FFEB3B");

  const handleBookmark = async () => {
    await addBookmark({ bookId, page: currentPage, label: "" });
    toast.success("تمت إضافة إشارة مرجعية");
  };

  const handleAddHighlight = async (e) => {
    e.preventDefault();
    if (!highlightText.trim()) return;

    await addHighlight({
      bookId,
      page: currentPage,
      text: highlightText,
      color: highlightColor,
    });

    toast.success("تم حفظ التظليل");
    setHighlightText("");
    setShowHighlightForm(false);
    onTabChange("highlights");
    if (onHighlightAdded) onHighlightAdded();
  };

  return (
    <div className="reader-toolbar">
      <div className="reader-toolbar__nav">
        <button className="reader-toolbar__btn" onClick={onPrev}>السابق</button>
        <span className="reader-toolbar__page">صفحة {pageNumber} من {numPages || "..."}</span>
        <button className="reader-toolbar__btn" onClick={onNext}>التالي</button>
        <button className="reader-toolbar__btn reader-toolbar__btn--accent" onClick={handleBookmark}>🔖</button>
        <button
          className="reader-toolbar__btn reader-toolbar__btn--accent"
          onClick={() => setShowHighlightForm((v) => !v)}
        >
          🖍️ظلل
        </button>
      </div>

      {showHighlightForm && (
        <form className="reader-toolbar__highlight-form" onSubmit={handleAddHighlight}>
          <p className="reader-toolbar__highlight-hint">
            انسخ النص من الصفحة (تحديد + Ctrl/Cmd+C) والصقه هون:
          </p>
          <textarea
            className="reader-toolbar__highlight-textarea"
            placeholder="الصق النص هنا..."
            value={highlightText}
            onChange={(e) => setHighlightText(e.target.value)}
            required
          />
          <div className="reader-toolbar__highlight-row">
            <label className="reader-toolbar__color-label">
              اللون:
              <input
                type="color"
                value={highlightColor}
                onChange={(e) => setHighlightColor(e.target.value)}
                className="reader-toolbar__color-input"
              />
            </label>
            <button type="submit" className="reader-toolbar__highlight-save">حفظ التظليل</button>
            <button
              type="button"
              className="reader-toolbar__highlight-cancel"
              onClick={() => setShowHighlightForm(false)}
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

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