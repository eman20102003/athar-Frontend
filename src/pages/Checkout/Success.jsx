import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { confirmPayment } from "../../api/paymentApi";
import "./Success.css";

const Success = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await confirmPayment(orderId);
        setStatus(data.order.status);
      } catch (err) {
        console.error(err);
      }
    };

    check(); 
    const interval = setInterval(check, 2000);
    const timeout = setTimeout(() => clearInterval(interval), 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [orderId]);

  return (
    <div className="success">
      {status === "paid" ? (
        <>
          <span className="success__mark">❧</span>
          <h2 className="success__title">تم الدفع بنجاح</h2>
          <p className="success__text">الكتاب بانتظارك الآن بمكتبتك</p>
          <Link to="/library" className="success__link">اذهب إلى مكتبتي</Link>
        </>
      ) : status === "failed" ? (
        <>
          <h2 style={{ color: "var(--color-error)" }}>فشلت عملية الدفع</h2>
          <Link to="/" className="success__link">العودة للرئيسية</Link>
        </>
      ) : (
        <p className="success__waiting">جاري تأكيد عملية الدفع...</p>
      )}
    </div>
  );
};

export default Success;