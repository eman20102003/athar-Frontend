import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useBooks } from "../../hooks/useBooks";
import BookGrid from "../../components/books/BookGrid";
import BookFilters from "../../components/books/BookFilters";
import SignatureDivider from "../../components/common/SignatureDivider";
import Loader from "../../components/common/Loader";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();
  const location = useLocation();

 
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const { data: featured, isLoading: loadingFeatured } = useBooks({ isFeatured: true, limit: 4 });
  const { data: popular, isLoading: loadingPopular } = useBooks({ sort: "rating", limit: 4 });
  const { data: mostRead, isLoading: loadingMostRead } = useBooks({ sort: "reads", limit: 4 });
  const { data: all, isLoading: loadingAll } = useBooks({ page: 1, limit: 12 });

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__hero-title">اقرأ. تأمّل. اترك أثرًا.</h1>
        <p className="home__hero-subtitle">مكتبتك الرقمية، بمساعدة الذكاء الاصطناعي</p>
      </section>

      {featured?.books?.length > 0 && (
        <section id="featured">
          <SignatureDivider label="كتب مميزة" />
          {loadingFeatured ? <Loader /> : <BookGrid books={featured.books} />}
        </section>
      )}

      <section id="popular">
        <SignatureDivider label="الأكثر شهرة" />
        {loadingPopular ? <Loader /> : <BookGrid books={popular?.books || []} />}
      </section>

      {mostRead?.books?.some((b) => b.readsCount > 0) && (
        <section id="most-read">
          <SignatureDivider label="الأكثر قراءة" />
          {loadingMostRead ? <Loader /> : <BookGrid books={mostRead.books} />}
        </section>
      )}

      <SignatureDivider label="تصفّح كل المكتبة" />
      <BookFilters filters={{ page: 1, limit: 12 }} onChange={() => {}} />
      {loadingAll ? <Loader /> : <BookGrid books={all?.books || []} />}

      <section id="about" className="home__section">
        <SignatureDivider label="من نحن" />
        <p className="home__about-text">
          "أثر" مكتبة رقمية تجمع بين متعة القراءة وقوة الذكاء الاصطناعي — نساعدك تفهم، تلخص
          وتتفاعل مع كل كتاب تقرئه، وتترك بصمتك الخاصة على كل صفحة.
        </p>
      </section>

      <section id="contact" className="home__section">
        <SignatureDivider label="تواصل معنا" />
        <p className="home__about-text">
          لأي استفسار أو اقتراح، راسلنا على{" "}
          <a href="mailto:support@athar.com" className="home__contact-link">support@athar.com</a>
        </p>
      </section>
    </div>
  );
};

export default Home;