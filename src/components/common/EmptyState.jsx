import "../../styles/EmptyState.css";

const EmptyState = ({ title, message }) => (
  <div className="empty-state">
    <span className="empty-state__mark">❧</span>
    <h3 className="empty-state__title">{title}</h3>
    <p className="empty-state__message">{message}</p>
  </div>
);

export default EmptyState;