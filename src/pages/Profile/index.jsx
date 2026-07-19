import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile">
      <h1>حسابي</h1>
      <div className="profile__card">
        <p><strong>الاسم:</strong> {user?.name}</p>
        <p><strong>البريد الإلكتروني:</strong> {user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;