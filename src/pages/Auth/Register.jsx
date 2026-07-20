import RegisterForm from "../../components/forms/RegisterForm";
import "./Auth.css";
const Register = () => {
return (
  <div className="auth-page">
    <div className="auth-page__visual">
      <span className="auth-page__visual-mark">❧</span>
      <p className="auth-page__visual-quote">
        "الكتاب الذي لا يُعاد قراءته لا يستحق أن يُقرأ ولو مرة"
      </p>
    </div>

    <div className="auth-page__form-side">
      <form className="auth-card" onSubmit={handleSubmit}>
        <RegisterForm />
      </form>
    </div>
  </div>
);
};

export default Register;