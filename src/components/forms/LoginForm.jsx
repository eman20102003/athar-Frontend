import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    const validationErrors = {};

    if (!form.email) {
      validationErrors.email = "البريد الإلكتروني مطلوب";
    }
    if (!form.password) {
      validationErrors.password = "كلمة المرور مطلوبة";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {

      await login(
        form.email,
        form.password
      );

      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "حدث خطأ ما"
      );

    } finally {

      setLoading(false);

    }

  };
  return (

    <form
      className="auth-card"
      onSubmit={handleSubmit}
    >

      <h1 className="auth-card__title">
        مرحبًا بعودتك
      </h1>


      <p className="auth-card__subtitle">
        سجّل دخولك لتتابع من حيث توقفت
      </p>

      <label className="auth-card__label">

        البريد الإلكتروني

        <input
          type="email"
          className="auth-card__input"
          value={form.email}
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

      </label>
      {errors.email && (
        <p className="error">
          {errors.email}
        </p>
      )}

      <label className="auth-card__label">
        كلمة المرور
        <input
          type="password"
          className="auth-card__input"
          value={form.password}
          onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })
          }
        />
      </label>
      {errors.password && (
        <p className="error">
          {errors.password}
        </p>
      )}

      <button
        type="submit"
        className="auth-card__submit"
        disabled={loading}
      >
        {
          loading
          ?
          "جاري الدخول..."
          :
          "تسجيل الدخول"
        }

      </button>

      <p className="auth-card__footer">
        ليس لديك حساب؟

        <Link to="/register">
          أنشئي حسابًا
        </Link>
      </p>
    </form>

  );

};


export default LoginForm;