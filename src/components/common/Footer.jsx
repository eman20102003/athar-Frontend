import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <span className="footer__mark">❧</span>
    <p className="footer__text">أثر — مكتبتك الرقمية · {new Date().getFullYear()}</p>
  </footer>
);

export default Footer;