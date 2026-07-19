import { useEffect, useState } from "react";
import { getFavorites } from "../../api/libraryApi";
import BookGrid from "../../components/books/BookGrid";
import SignatureDivider from "../../components/common/SignatureDivider";
import Loader from "../../components/common/Loader";
import "./Library.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    getFavorites().then(({ data }) => setFavorites(data.favorites));
  }, []);

  if (!favorites) return <Loader />;

  return (
    <div className="library">
      <h1>المفضلة</h1>
      <SignatureDivider />
      <BookGrid books={favorites.map((f) => f.book)} />
    </div>
  );
};

export default Favorites;