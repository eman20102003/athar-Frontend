import RegisterForm from "../../components/forms/RegisterForm";
import "./Auth.css";

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-page__visual">
        <span className="auth-page__visual-mark">❧</span>
        <p className="auth-page__visual-quote">
          "كل قارئ يبدأ رحلته بصفحة واحدة، فلتكن هذه صفحتك الأولى"
        </p>
      </div>

      <div className="auth-page__form-side">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;