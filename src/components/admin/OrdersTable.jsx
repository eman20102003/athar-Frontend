import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { updateOrderStatus, deleteOrderAdmin } from "../../api/adminApi";
import { toast } from "react-toastify";
import ConfirmDialog from "../common/ConfirmDialog";
import "../../styles/admin/OrdersTable.css";

const statusLabels = {
  paid: "مدفوع",
  pending: "قيد الانتظار",
  failed: "فشل",
};

const OrdersTable = ({ orders, onChanged }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    toast.success("تم تحديث حالة الطلب");
    onChanged(); 
  };

  const handleDeleteConfirmed = async () => {
    await deleteOrderAdmin(confirmDeleteId);
    toast.success("تم حذف الطلب");
    setConfirmDeleteId(null);
    onChanged(); 
  };

  if (!orders.length) {
    return <p className="text-muted">لا توجد طلبات مطابقة</p>;
  }

  return (
    <>
      <table className="orders-table">
        <thead>
          <tr>
            <th>المستخدم</th>
            <th>الكتاب</th>
            <th>المبلغ</th>
            <th>الحالة</th>
            <th>التاريخ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user?.name}<br /><span className="orders-table__email">{order.user?.email}</span></td>
              <td>{order.book?.title || order.bookTitleSnapshot || "كتاب محذوف"}</td>
              <td className="orders-table__amount">${order.amount}</td>
              <td>
                <select
                  className="orders-table__status-select"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="pending">قيد الانتظار</option>
                  <option value="paid">مدفوع</option>
                  <option value="failed">فشل</option>
                </select>
              </td>
              <td className="orders-table__date">{formatDate(order.createdAt)}</td>
              <td>
                <button className="orders-table__delete" onClick={() => setConfirmDeleteId(order._id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmDeleteId && (
        <ConfirmDialog
          message="هل أنت متأكدة من حذف هذا الطلب؟"
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </>
  );
};

export default OrdersTable;