import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderStatus } from "../../api/paymentApi";
import "./Success.css";

const Success = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await getOrderStatus(orderId);
      if (data.order.status === "paid") {
        clearInterval(interval);
        setStatus("paid");
      }
    }, 2000);

    const timeout = setTimeout(() => clearInterval(interval), 15000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [orderId]);

  return (
    <div className="success">
      {status === "paid" ? (
        <>
          <span className="success__mark">❧</span>
          <h2 className="success__title">تم الدفع بنجاح</h2>
          <p className="success__text">الكتاب بانتظارك الآن بمكتبتك</p>
          <Link to="/library" className="success__link">اذهبي إلى مكتبتي</Link>
        </>
      ) : (
        <p className="success__waiting">جاري تأكيد عملية الدفع...</p>
      )}
    </div>
  );
};

export default Success;