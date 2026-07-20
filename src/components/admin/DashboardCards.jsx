import { Users, BookOpen, ShoppingBag, DollarSign } from "lucide-react";
import "./DashboardCards.css";

const DashboardCards = ({ summary }) => (
  <div className="dashboard-cards">
    <div className="dashboard-cards__card">
      <Users size={24} className="dashboard-cards__icon" />
      <span className="dashboard-cards__value">{summary.usersCount}</span>
      <span className="dashboard-cards__label">المستخدمين</span>
    </div>
    <div className="dashboard-cards__card">
      <BookOpen size={24} className="dashboard-cards__icon" />
      <span className="dashboard-cards__value">{summary.booksCount}</span>
      <span className="dashboard-cards__label">الكتب</span>
    </div>
    <div className="dashboard-cards__card">
      <ShoppingBag size={24} className="dashboard-cards__icon" />
      <span className="dashboard-cards__value">{summary.ordersCount}</span>
      <span className="dashboard-cards__label">الطلبات المدفوعة</span>
    </div>
    <div className="dashboard-cards__card dashboard-cards__card--accent">
      <DollarSign size={24} className="dashboard-cards__icon" />
      <span className="dashboard-cards__value">${summary.totalRevenue}</span>
      <span className="dashboard-cards__label">إجمالي الإيرادات</span>
    </div>
  </div>
);

export default DashboardCards;