import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useBooks } from "../../hooks/useBooks";
import { useContinueReading } from "../../hooks/useContinueReading";
import BookGrid from "../../components/books/BookGrid";
import BookFilters from "../../components/books/BookFilters";
import ContinueReadingCard from "../../components/books/ContinueReadingCard";
import SignatureDivider from "../../components/common/SignatureDivider";
import Loader from "../../components/common/Loader";
import "./Home.css";
import { BookOpen, Sparkles, MessageCircle, Mail, Github, Twitter } from "lucide-react";  

const Home = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [filters, setFilters] = useState({ page: 1, limit: 12 }); 

  if (user?.role === "admin") return <Navigate to="/admin" replace />;

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const { data: featured, isLoading: loadingFeatured } = useBooks({ isFeatured: true, limit: 4 });
  const { data: popular, isLoading: loadingPopular } = useBooks({ sort: "rating", limit: 4 });
  const { data: mostRead, isLoading: loadingMostRead } = useBooks({ sort: "reads", limit: 4 });
  const { data: all, isLoading: loadingAll } = useBooks(filters); 
  const { data: continueReading } = useContinueReading();

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__hero-title">اقرأ. تأمّل. اترك أثرًا.</h1>
        <p className="home__hero-subtitle">مكتبتك الرقمية، بمساعدة الذكاء الاصطناعي</p>
      </section>

      {user && continueReading?.length > 0 && (
        <section>
          <SignatureDivider label="أكمل القراءة" />
          <div className="home__continue-row">
            {continueReading.map((p) => <ContinueReadingCard key={p._id} progress={p} />)}
          </div>
        </section>
      )}

      {featured?.books?.length > 0 && (
        <section id="featured">
          <SignatureDivider label="كتب مميزة" />
          {loadingFeatured ? <Loader /> : <BookGrid books={featured.books} />}
        </section>
      )}

     
{popular?.books?.filter((b) => b.rating > 0).length > 0 && (
  <section id="popular">
    <SignatureDivider label="الأكثر شهرة" />
    {loadingPopular ? <Loader /> : <BookGrid books={popular.books.filter((b) => b.rating > 0)} />}
  </section>
)}


{mostRead?.books?.filter((b) => b.readsCount > 0).length > 0 && (
  <section id="most-read">
    <SignatureDivider label="الأكثر قراءة" />
    {loadingMostRead ? <Loader /> : <BookGrid books={mostRead.books.filter((b) => b.readsCount > 0)} />}
  </section>
)}

      <SignatureDivider label="تصفّح كل المكتبة" />
      <BookFilters filters={filters} onChange={setFilters} /> 
      {loadingAll ? <Loader /> : <BookGrid books={all?.books || []} />}

     


<section id="about" className="home__section">
  <SignatureDivider label="من نحن" />
  <div className="home__about-grid">
    <div className="home__about-card">
      <BookOpen size={28} className="home__about-icon" />
      <h3>مكتبة متكاملة</h3>
      <p>مئات الكتب بمختلف التصنيفات، مجانية ومدفوعة، بانتظار أن تتركي أثرك عليها.</p>
    </div>
    <div className="home__about-card">
      <Sparkles size={28} className="home__about-icon" />
      <h3>ذكاء اصطناعي مرافق</h3>
      <p>اسألي، لخّصي، واستوضحي أي فكرة داخل الكتاب، بمساعد ذكي يفهم السياق الذي تقرئينه بالضبط.</p>
    </div>
    <div className="home__about-card">
      <MessageCircle size={28} className="home__about-icon" />
      <h3>مجتمع قرّاء</h3>
      <p>شاركي رأيك، اطّلعي على تقييمات الآخرين، واكتشفي كتبًا جديدة عبر تجارب قرّاء حقيقيين.</p>
    </div>
  </div>
</section>

<section id="contact" className="home__section">
  <SignatureDivider label="تواصل معنا" />
  <div className="home__contact-card">
    <p className="home__contact-text">
      عندك اقتراح، ملاحظة، أو مشكلة تقنية؟ فريقنا جاهز يسمعك.
    </p>
    <div className="home__contact-links">
      <a href="mailto:support@athar.com" className="home__contact-item">
        <Mail size={18} /> support@athar.com
      </a>
      <a href="#" className="home__contact-item">
        <Twitter size={18} /> athar_app@
      </a>
      <a href="#" className="home__contact-item">
        <Github size={18} /> athar-platform
      </a>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;