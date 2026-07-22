import { useEffect, useState } from "react";
import { getBooks, deleteBook, getCategories } from "../../api/booksApi";
import { getFileUrl } from "../../utils/getFileUrl";
import { toast } from "react-toastify";
import BookFormModal from "../../components/admin/BookFormModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import "./BooksManager.css";

const BooksManager = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // 👈 جديد

  const loadBooks = () => getBooks({ limit: 100 }).then(({ data }) => setBooks(data.books));

  useEffect(() => {
    loadBooks();
    getCategories().then(({ data }) => setCategories(data.categories));
  }, []);

  
  const handleDeleteConfirmed = async () => {
    await deleteBook(confirmDeleteId);
    toast.success("تم حذف الكتاب");
    setConfirmDeleteId(null); 
    loadBooks(); 
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleSaved = () => {
    setShowForm(false);
    loadBooks();
  };

  return (
    <div className="books-manager">
      <div className="books-manager__header">
        <h1>إدارة الكتب</h1>
        <button className="books-manager__add" onClick={handleAddNew}>+ إضافة كتاب</button>
      </div>

      <div className="books-manager__list">
        {books.map((book) => (
          <div key={book._id} className="books-manager__item">
            <img src={getFileUrl(book.coverImage)} alt={book.title} className="books-manager__cover" />
            <div className="books-manager__info">
              <h3>{book.title}</h3>
              <p className="text-muted">{book.author} · {book.isFree ? "مجاني" : `$${book.price}`}</p>
              <div className="books-manager__badges">
                {book.isFeatured && <span className="books-manager__badge">مميز</span>}
                {!book.isPublished && <span className="books-manager__badge books-manager__badge--muted">غير منشور</span>}
              </div>
            </div>
            <div className="books-manager__actions">
              <button onClick={() => handleEdit(book)}>تعديل</button>
              <button className="books-manager__delete" onClick={() => setConfirmDeleteId(book._id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <BookFormModal
          book={editingBook}
          categories={categories}
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}

     
      {confirmDeleteId && (
        <ConfirmDialog
          message="هل أنت متأكدة من حذف هذا الكتاب؟"
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default BooksManager;