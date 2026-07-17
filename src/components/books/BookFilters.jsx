import "./BookFilters.css";

const BookFilters = ({
  filters,
  setFilters,
  categories = [],
}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      sort: "",
    });
  };

  return (
    <div className="book-filters">

      <input
        type="text"
        name="search"
        placeholder="ابحث عن كتاب..."
        value={filters.search}
        onChange={handleChange}
      />

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
      >
        <option value="">كل التصنيفات</option>

        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <select
        name="sort"
        value={filters.sort}
        onChange={handleChange}
      >
        <option value="">الترتيب</option>

        <option value="latest">
          الأحدث
        </option>

        <option value="popular">
          الأكثر قراءة
        </option>

        <option value="price">
          السعر
        </option>
      </select>

      <button
        onClick={resetFilters}
      >
        إعادة ضبط
      </button>

    </div>
  );
};

export default BookFilters;