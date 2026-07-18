import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => (
  <div className="not-found">
    <span className="not-found__mark">❧</span>
    <h1 className="not-found__title">404</h1>
    <p className="not-found__text">الصفحة اللي تبحث عنها غير موجودة، أو انمحى أثرها</p>
    <Link to="/" className="not-found__link">العودة للرئيسية</Link>
  </div>
);

export default NotFound;