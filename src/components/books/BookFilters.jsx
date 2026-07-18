import { useEffect, useState } from "react";
import { getCategories } from "../../api/booksApi";
import "../../styles/BookFilters.css";

const BookFilters = ({ filters, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.categories));
  }, []);

  const update = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <div className="book-filters">
      <input
        className="book-filters__search"
        placeholder="ابحث عن كتاب أو مؤلف..."
        value={filters.search || ""}
        onChange={(e) => update("search", e.target.value)}
      />

      <select className="book-filters__select" value={filters.category || ""} onChange={(e) => update("category", e.target.value)}>
        <option value="">كل التصنيفات</option>
        {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>

      <select className="book-filters__select" value={filters.isFree ?? ""} onChange={(e) => update("isFree", e.target.value)}>
        <option value="">الكل</option>
        <option value="true">مجاني</option>
        <option value="false">مدفوع</option>
      </select>
    </div>
  );
};

export default BookFilters;