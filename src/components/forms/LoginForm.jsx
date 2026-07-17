import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);

      toast.success("تم تسجيل الدخول بنجاح");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "فشل تسجيل الدخول"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <h2>تسجيل الدخول</h2>

      <input
        type="email"
        placeholder="البريد الإلكتروني"
        {...register("email", {
          required: "البريد الإلكتروني مطلوب",
        })}
      />

      {errors.email && (
        <p>{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="كلمة المرور"
        {...register("password", {
          required: "كلمة المرور مطلوبة",
        })}
      />

      {errors.password && (
        <p>{errors.password.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "جاري تسجيل الدخول..."
          : "دخول"}
      </button>

    </form>
  );
};

export default LoginForm;