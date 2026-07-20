import { useEffect, useState } from "react";
import { ShoppingBag, CheckCircle2, Clock, XCircle } from "lucide-react";
import { getMyOrders } from "../../api/paymentApi";
import { getFileUrl } from "../../utils/getFileUrl";
import { formatDate } from "../../utils/formatDate";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import "./MyOrders.css";

const statusConfig = {
  paid: { label: "مدفوع", icon: CheckCircle2, className: "paid" },
  pending: { label: "قيد الانتظار", icon: Clock, className: "pending" },
  failed: { label: "فشل", icon: XCircle, className: "failed" },
};

const MyOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getMyOrders().then(({ data }) => setOrders(data.orders));
  }, []);

  if (!orders) return <Loader />;

  const totalSpent = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="my-orders">
      <div className="my-orders__header">
        <ShoppingBag size={28} className="my-orders__header-icon" />
        <div>
          <h1>طلباتي</h1>
          <p className="text-muted">سجل كامل بكل عمليات الشراء التي قمتِ بها</p>
        </div>
      </div>

      {orders.length > 0 && (
        <div className="my-orders__summary">
          <span>إجمالي الإنفاق:</span>
          <strong>${totalSpent.toFixed(2)}</strong>
        </div>
      )}

      {!orders.length ? (
        <EmptyState title="لا توجد طلبات بعد" message="طلباتك ستظهر هنا بعد أول عملية شراء" />
      ) : (
        <div className="my-orders__list">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <div key={order._id} className="my-orders__item">
                <img src={getFileUrl(order.book?.coverImage)} alt={order.book?.title} className="my-orders__cover" />

                <div className="my-orders__info">
                  <h3 className="my-orders__title">{order.book?.title}</h3>
                  <p className="my-orders__date">{formatDate(order.createdAt)}</p>
                </div>

                <div className="my-orders__meta">
                  <span className="my-orders__price">${order.amount}</span>
                  <span className={`my-orders__status my-orders__status--${status.className}`}>
                    <StatusIcon size={14} /> {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;