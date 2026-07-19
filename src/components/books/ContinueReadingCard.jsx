import { Link } from "react-router-dom";
import { getFileUrl } from "../../utils/getFileUrl";
import "../../styles/books/ContinueReadingCard.css";

const ContinueReadingCard = ({ progress }) => (
  <Link to={`/reader/${progress.book._id}`} className="continue-card">
    <img src={getFileUrl(progress.book.coverImage)} alt={progress.book.title} className="continue-card__cover" />
    <div className="continue-card__info">
      <h4 className="continue-card__title">{progress.book.title}</h4>
      <div className="continue-card__bar">
        <div className="continue-card__bar-fill" style={{ width: `${progress.percentage}%` }} />
      </div>
      <span className="continue-card__percent">{progress.percentage}%</span>
    </div>
  </Link>
);

export default ContinueReadingCard;