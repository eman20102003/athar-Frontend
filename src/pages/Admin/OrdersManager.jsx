import { useEffect, useState } from "react";
import { getAllOrders } from "../../api/adminApi";
import OrdersTable from "../../components/admin/OrdersTable";
import EmptyState from "../../components/common/EmptyState";
import "./OrdersManager.css";

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

 const loadOrders = () => {
  getAllOrders(statusFilter ? { status: statusFilter } : {})
    .then(({ data }) => setOrders(data.orders))
    .catch((err) => {
      console.error(err);
      toast.error("تعذر تحميل الطلبات");
    });
};

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

 if (!orders.length) {
    return (
      <div className="orders-manager">
        <h1>الطلبات</h1>
        <EmptyState title="لا توجد طلبات بعد" message="الطلبات ستظهر حال توفرها " />
      </div>
    );
  } 

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
        </select>
      </div>

   
      <OrdersTable orders={orders} onChanged={loadOrders} />
    </div>
  );
};

export default OrdersManager;