import "./Loader.css";

const Loader = ({ text = "جاري التحميل" }) => (
  <div className="loader">
    <div className="loader__book">
      <div className="loader__page loader__page--1" />
      <div className="loader__page loader__page--2" />
      <div className="loader__page loader__page--3" />
    </div>
    <p className="loader__text">{text}<span className="loader__dots"><span>.</span><span>.</span><span>.</span></span></p>
  </div>
);

export default Loader;