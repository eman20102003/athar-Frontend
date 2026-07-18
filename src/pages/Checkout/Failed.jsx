import { Link } from "react-router-dom";
import "./Success.css";

const Failed = () => (
  <div className="success">
    <h2 style={{ color: "var(--color-error)" }}>لم تكتمل عملية الدفع</h2>
    <p className="success__text">لم يتم خصم أي مبلغ. حاولي مرة أخرى.</p>
    <Link to="/" className="success__link">العودة للرئيسية</Link>
  </div>
);

export default Failed;