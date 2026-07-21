import LoginForm from "../../components/forms/LoginForm";
import "./Auth.css";

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-page__visual">
        <span className="auth-page__visual-mark">❧</span>
        <p className="auth-page__visual-quote">
          "الكتاب الذي لا يُعاد قراءته لا يستحق أن يُقرأ ولو مرة"
        </p>
      </div>

      <div className="auth-page__form-side">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;