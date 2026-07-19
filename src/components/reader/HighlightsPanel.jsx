import { useEffect, useState } from "react";
import { getHighlights, deleteHighlight } from "../../api/readerApi";
import EmptyState from "../common/EmptyState";
import "../../styles/reader/HighlightsPanel.css";

const HighlightsPanel = ({ bookId, onJump }) => {
  const [highlights, setHighlights] = useState([]);

  const load = () => getHighlights(bookId).then(({ data }) => setHighlights(data.highlights));

  useEffect(() => {
    load();
  }, [bookId]);

  const handleDelete = async (id) => {
    await deleteHighlight(id);
    load();
  };

  if (!highlights.length) {
    return <EmptyState title="لا توجد تظليلات بعد" message="ظلّل نصًا أثناء القراءة لحفظه هنا" />;
  }

  return (
    <div className="highlights-panel">
      {highlights.map((h) => (
        <div key={h._id} className="highlights-panel__item" style={{ borderInlineStartColor: h.color }}>
          <button className="highlights-panel__page" onClick={() => onJump(h.page)}>
            صفحة {h.page}
          </button>
          <p className="highlights-panel__text">{h.text}</p>
          <button className="highlights-panel__delete" onClick={() => handleDelete(h._id)}>حذف</button>
        </div>
      ))}
    </div>
  );
};

export default HighlightsPanel;