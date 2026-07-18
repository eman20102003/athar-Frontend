import "../../styles/common/Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <p>جاري التحميل...</p>
    </div>
  );
};

export default Loader;