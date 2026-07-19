import { formatDate } from "../../utils/formatDate";
import "../../styles/admin/OrdersTable.css";

const statusLabels = {
  paid: "مدفوع",
  pending: "قيد الانتظار",
  failed: "فشل",
  refunded: "مسترجع",
};

const OrdersTable = ({ orders }) => {
  if (!orders.length) {
    return <p className="text-muted">لا توجد طلبات مطابقة</p>;
  }

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>المستخدم</th>
          <th>الكتاب</th>
          <th>المبلغ</th>
          <th>الحالة</th>
          <th>التاريخ</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.user?.name}<br /><span className="orders-table__email">{order.user?.email}</span></td>
            <td>{order.book?.title}</td>
            <td className="orders-table__amount">${order.amount}</td>
            <td>
              <span className={`orders-table__status orders-table__status--${order.status}`}>
                {statusLabels[order.status] || order.status}
              </span>
            </td>
            <td className="orders-table__date">{formatDate(order.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;