import { useEffect, useState } from "react";
import { getAllOrders } from "../../api/adminApi";
import OrdersTable from "../../components/admin/OrdersTable";
import "./OrdersManager.css";

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  const loadOrders = (status) => {
    getAllOrders(status ? { status } : {}).then(({ data }) => setOrders(data.orders));
  };

  useEffect(() => {
    loadOrders(statusFilter);
  }, [statusFilter]);

  return (
    <div className="orders-manager">
      <div className="orders-manager__header">
        <h1>الطلبات</h1>

        <select
          className="orders-manager__filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">كل الحالات</option>
          <option value="paid">مدفوع</option>
          <option value="pending">قيد الانتظار</option>
          <option value="failed">فشل</option>
          <option value="refunded">مسترجع</option>
        </select>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
};

export default OrdersManager;