import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Search, BookOpen } from "lucide-react";
import "./NotFound.css";

const NotFound = () => (
  <div className="not-found">
    <motion.div
      className="not-found__visual"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="not-found__book not-found__book--left">
        <BookOpen size={26} />
      </div>

      <div className="not-found__number">
        <span>4</span>
        <span className="not-found__mark-wrapper">
          <span className="not-found__mark">❧</span>
        </span>
        <span>4</span>
      </div>

      <div className="not-found__book not-found__book--right">
        <BookOpen size={26} />
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="not-found__content"
    >
      <h1 className="not-found__title">هذه الصفحة انمحى أثرها</h1>
      <p className="not-found__text">
        يبدو أنكِ تتبعين خيطًا انقطع، أو صفحة طُويت من الكتاب.
        <br />
        لا بأس، لنعد سويًا لحيث بدأنا.
      </p>

      <div className="not-found__actions">
        <Link to="/" className="not-found__btn not-found__btn--primary">
          <Home size={18} /> العودة للرئيسية
        </Link>
        <Link to="/#popular" className="not-found__btn not-found__btn--outline">
          <Search size={18} /> تصفّحي المكتبة
        </Link>
      </div>
    </motion.div>

    <motion.div
      className="not-found__footer-quote"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      "ليست كل الطرق تقود إلى صفحة، لكن كل صفحة تستحق أن تُقرأ"
    </motion.div>
  </div>
);

export default NotFound;