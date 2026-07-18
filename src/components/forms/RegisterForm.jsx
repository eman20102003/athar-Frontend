import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";


const RegisterForm = () => {

  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });
  const [errors,setErrors] = useState({});
  const [loading,setLoading] = useState(false);
  const handleSubmit = async(e)=>{

    e.preventDefault();
    const validationErrors={};
    if(!form.name){
      validationErrors.name="الاسم مطلوب";
    }
    else if(form.name.length < 3){
      validationErrors.name="الاسم قصير";
    }

    if(!form.email){
      validationErrors.email="البريد الإلكتروني مطلوب";
    }

    if(!form.password){
      validationErrors.password="كلمة المرور مطلوبة";
    }
    else if(form.password.length < 6){
      validationErrors.password=
      "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if(!form.confirmPassword){
      validationErrors.confirmPassword=
      "تأكيد كلمة المرور مطلوب";
    }
    else if(form.password !== form.confirmPassword){
      validationErrors.confirmPassword=
      "كلمتا المرور غير متطابقتين";
    }

    if(Object.keys(validationErrors).length > 0){

      setErrors(validationErrors);
      return;

    }
    setErrors({});
    setLoading(true);
    try{
      await register(
        form.name,
        form.email,
        form.password
      );
      toast.success(
        "تم إنشاء الحساب بنجاح"
      );
      navigate("/login");
    }catch(error){
      toast.error(
        error.response?.data?.message ||
        "فشل إنشاء الحساب"
      );
    }finally{
      setLoading(false);
    }
  };
return(

<form className="auth-card" onSubmit={handleSubmit}>

<h1 className="auth-card__title">انضم إلى أثر</h1>
<p className="auth-card__subtitle">ابدأ مكتبتك الرقمية اليوم</p>

<label className="auth-card__label">الاسم الكامل
<input className="auth-card__input" value={form.name}onChange={(e)=>
setForm({...form,name:e.target.value})}/>
</label>

{errors.name &&<p className="error">{errors.name}</p>}

<label className="auth-card__label">البريد الإلكتروني
<input type="email" className="auth-card__input" value={form.email}onChange={(e)=>
setForm({...form, email:e.target.value})}/>
</label>
{errors.email &&<p className="error">{errors.email}</p>}
<label className="auth-card__label">كلمة المرور
<input type="password" className="auth-card__input" value={form.password}onChange={(e)=>
setForm({...form,password:e.target.value})}/>
</label>
{errors.password &&<p className="error">{errors.password}</p>}
<label className="auth-card__label">تأكيد كلمة المرور
<input type="password" className="auth-card__input" value={form.confirmPassword}onChange={(e)=>
setForm({...form,confirmPassword:e.target.value})}/>
</label>
{errors.confirmPassword &&<p className="error">{errors.confirmPassword}</p>}
<button
className="auth-card__submit"
disabled={loading}
>
{
loading
?
"جاري الإنشاء..."
:
"إنشاء حساب"
}
</button>
<p className="auth-card__footer">
لديك حساب بالفعل؟
<Link to="/login">
سجّلي دخولك
</Link>
</p>
</form>
);
};
export default RegisterForm;