import { Link } from "react-router-dom";
import { BookOpen, Mail, Twitter, Github, Instagram } from "lucide-react";
import { Share2, Link as LinkIcon } from "lucide-react";
import "../../styles/common/Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer__top">
      <div className="footer__brand">
        <Link to="/" className="footer__logo">
          <BookOpen size={22} />
          أثر
        </Link>
        <p className="footer__tagline">
          مكتبتك الرقمية التي تفهمك — اقرأ، دوّن، وناقش كل فكرة.
        </p>
        <div className="footer__socials">
          <a href="#" className="footer__social-icon" aria-label="تويتر"><Twitter size={17} /></a>
          <a href="#" className="footer__social-icon" aria-label="انستغرام"><Instagram size={17} /></a>
          <a href="#" className="footer__social-icon" aria-label="جيت هب"><Github size={17} /></a>
          <a href="mailto:support@athar.com" className="footer__social-icon" aria-label="البريد"><Mail size={17} /></a>
        </div>
      </div>

      <div className="footer__col">
        <h4 className="footer__col-title">تصفّحي</h4>
        <Link to="/" className="footer__link">الرئيسية</Link>
        <a href="/#featured" className="footer__link">كتب مميزة</a>
        <a href="/#popular" className="footer__link">الأشهر</a>
        <a href="/#most-read" className="footer__link">الأكثر قراءة</a>
      </div>

      <div className="footer__col">
        <h4 className="footer__col-title">حسابي</h4>
        <Link to="/library" className="footer__link">مكتبتي</Link>
        <Link to="/favorites" className="footer__link">المفضلة</Link>
        <Link to="/orders" className="footer__link">طلباتي</Link>
        <Link to="/profile" className="footer__link">حسابي الشخصي</Link>
      </div>

      <div className="footer__col">
        <h4 className="footer__col-title">تواصل معنا</h4>
        <a href="/#about" className="footer__link">من نحن</a>
        <a href="/#contact" className="footer__link">تواصل معنا</a>
        <a href="mailto:support@athar.com" className="footer__link">support@athar.com</a>
      </div>
    </div>

    <div className="footer__bottom">
      <span className="footer__mark">❧</span>
      <p className="footer__text">أثر — مكتبتك الرقمية · {new Date().getFullYear()}</p>
    </div>
  </footer>
);

export default Footer;