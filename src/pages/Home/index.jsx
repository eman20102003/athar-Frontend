import { useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import BookGrid from "../../components/books/BookGrid";
import BookFilters from "../../components/books/BookFilters";
import SignatureDivider from "../../components/common/SignatureDivider";
import Loader from "../../components/common/Loader";
import "./Home.css";

const Home = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 12 });
  const { data, isLoading } = useBooks(filters);

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__hero-title">اقرأ. تأمّل. اترك أثرًا.</h1>
        <p className="home__hero-subtitle">مكتبتك الرقمية، بمساعدة الذكاء الاصطناعي</p>
      </section>

      <SignatureDivider label="تصفّح المكتبة" />

      <BookFilters filters={filters} onChange={setFilters} />

      {isLoading ? <Loader /> : <BookGrid books={data.books} />}
    </div>
  );
};

export default Home;