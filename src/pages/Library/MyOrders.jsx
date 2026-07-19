import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/paymentApi";
import { getFileUrl } from "../../utils/getFileUrl";
import { formatDate } from "../../utils/formatDate";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import "./MyOrders.css";

const statusLabels = {
  paid: "مدفوع",
  pending: "قيد الانتظار",
  failed: "فشل",
  refunded: "مسترجع",
};

const MyOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getMyOrders().then(({ data }) => setOrders(data.orders));
  }, []);

  if (!orders) return <Loader />;

  if (!orders.length) {
    return <EmptyState title="لا توجد طلبات بعد" message="طلباتك ستظهر هنا بعد أول عملية شراء" />;
  }

  return (
    <div className="my-orders">
      <h1>طلباتي</h1>
      <div className="my-orders__list">
        {orders.map((order) => (
          <div key={order._id} className="my-orders__item">
            <img src={getFileUrl(order.book?.coverImage)} alt={order.book?.title} className="my-orders__cover" />

            <div className="my-orders__info">
              <h3 className="my-orders__title">{order.book?.title}</h3>
              <p className="my-orders__date">{formatDate(order.createdAt)}</p>
            </div>

            <div className="my-orders__meta">
              <span className="my-orders__price">${order.amount}</span>
              <span className={`my-orders__status my-orders__status--${order.status}`}>
                {statusLabels[order.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;