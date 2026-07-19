import { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote } from "../../api/readerApi";
import EmptyState from "../common/EmptyState";
import "../../styles/reader/NotesPanel.css";

const NotesPanel = ({ bookId, currentPage }) => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  const load = () => getNotes(bookId).then(({ data }) => setNotes(data.notes));

  useEffect(() => { load(); }, [bookId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await createNote({ bookId, page: currentPage, content });
    setContent("");
    load();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    load();
  };

  return (
    <div className="notes-panel">
      <form className="notes-panel__form" onSubmit={handleAdd}>
        <textarea
          className="notes-panel__input"
          placeholder={`ملاحظة على صفحة ${currentPage}...`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="notes-panel__add">إضافة</button>
      </form>

      {!notes.length ? (
        <EmptyState title="لا توجد ملاحظات" message="سجّلي أفكارك أثناء القراءة" />
      ) : (
        <div className="notes-panel__list">
          {notes.map((n) => (
            <div key={n._id} className="notes-panel__item">
              <span className="notes-panel__page">صفحة {n.page}</span>
              <p className="notes-panel__content">{n.content}</p>
              <button className="notes-panel__delete" onClick={() => handleDelete(n._id)}>حذف</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPanel;