import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (values) => {
    try {
      await registerUser(
        values.name,
        values.email,
        values.password
      );

      toast.success("تم إنشاء الحساب بنجاح");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "فشل إنشاء الحساب"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <h2>إنشاء حساب</h2>

      <input
        placeholder="الاسم"
        {...register("name", {
          required: "الاسم مطلوب",
          minLength: {
            value: 3,
            message: "الاسم قصير",
          },
        })}
      />

      {errors.name && <p>{errors.name.message}</p>}

      <input
        type="email"
        placeholder="البريد الإلكتروني"
        {...register("email", {
          required: "البريد الإلكتروني مطلوب",
        })}
      />

      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="كلمة المرور"
        {...register("password", {
          required: "كلمة المرور مطلوبة",
          minLength: {
            value: 6,
            message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
          },
        })}
      />

      {errors.password && <p>{errors.password.message}</p>}

      <input
        type="password"
        placeholder="تأكيد كلمة المرور"
        {...register("confirmPassword", {
          required: "تأكيد كلمة المرور مطلوب",
          validate: (value) =>
            value === password || "كلمتا المرور غير متطابقتين",
        })}
      />

      {errors.confirmPassword && (
        <p>{errors.confirmPassword.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "جاري إنشاء الحساب..."
          : "إنشاء حساب"}
      </button>

    </form>
  );
};

export default RegisterForm;