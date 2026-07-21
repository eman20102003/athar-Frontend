import { useEffect, useState } from "react";
import { getBookmarks, deleteBookmark } from "../../api/readerApi";
import EmptyState from "../common/EmptyState";
import "../../styles/reader/BookmarksPanel.css";

const BookmarksPanel = ({ bookId, onJump }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const load = () => getBookmarks(bookId).then(({ data }) => setBookmarks(data.bookmarks));

  useEffect(() => { load(); }, [bookId]);

  const handleDelete = async (id) => {
    await deleteBookmark(id);
    load();
  };

  if (!bookmarks.length) {
    return <EmptyState title="لا توجد إشارات بعد" message="اضغط 🔖 أثناء القراءة لحفظ صفحتك" />;
  }

  return (
    <div className="bookmarks-panel">
      {bookmarks.map((b) => (
        <div key={b._id} className="bookmarks-panel__item">
          <button className="bookmarks-panel__page" onClick={() => onJump(b.page)}>صفحة {b.page}</button>
          <button className="bookmarks-panel__delete" onClick={() => handleDelete(b._id)}>×</button>
        </div>
      ))}
    </div>
  );
};

export default BookmarksPanel;