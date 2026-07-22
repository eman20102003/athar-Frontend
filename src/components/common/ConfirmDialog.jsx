import "../../styles/common/ConfirmDialog.css";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="confirm-dialog__overlay" onClick={onCancel}>
    <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
      <p className="confirm-dialog__message">{message}</p>
      <div className="confirm-dialog__actions">
        <button className="confirm-dialog__cancel" onClick={onCancel}>إلغاء</button>
        <button className="confirm-dialog__confirm" onClick={onConfirm}>تأكيد الحذف</button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;