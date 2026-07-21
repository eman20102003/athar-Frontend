import { useEffect, useState } from "react";
import { getFavorites } from "../../api/libraryApi";
import BookGrid from "../../components/books/BookGrid";
import SignatureDivider from "../../components/common/SignatureDivider";
import Loader from "../../components/common/Loader";
import "./Library.css";
import { Heart } from "lucide-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    getFavorites().then(({ data }) => setFavorites(data.favorites));
  }, []);

  if (!favorites) return <Loader />;

  return (
    <div className="library">
      <div className="library__header">
  <Heart size={28} className="library__header-icon" />
  <div>
    <h1>المفضلة</h1>
    <p className="text-muted">الكتب التي أعجبتك ووضعتها جانبًا للعودة إليها</p>
  </div>
</div>
      <SignatureDivider />
      <BookGrid books={favorites.map((f) => f.book)} />
    </div>
  );
};

export default Favorites;