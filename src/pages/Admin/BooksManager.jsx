import { useEffect, useState } from "react";
import { getBooks, createBook, updateBook, deleteBook, getCategories } from "../../api/booksApi";
import { getFileUrl } from "../../utils/getFileUrl";
import { toast } from "react-toastify";
import BookFormModal from "../../components/admin/BookFormModal";
import "./BooksManager.css";

const BooksManager = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadBooks = () => getBooks({ limit: 100 }).then(({ data }) => setBooks(data.books));

  useEffect(() => {
    loadBooks();
    getCategories().then(({ data }) => setCategories(data.categories));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا الكتاب؟")) return;
    await deleteBook(id);
    toast.success("تم حذف الكتاب");
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
              <button className="books-manager__delete" onClick={() => handleDelete(book._id)}>حذف</button>
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
    </div>
  );
};

export default BooksManager;