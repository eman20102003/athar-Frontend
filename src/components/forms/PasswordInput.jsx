import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../../styles/forms/PasswordInput.css";

const PasswordInput = ({ value, onChange, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-input">
      <input
        type={visible ? "text" : "password"}
        className="auth-card__input"
        value={value}
        onChange={onChange}
        {...props}
      />
      <button
        type="button"
        className="password-input__toggle"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        aria-label={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
};

export default PasswordInput;