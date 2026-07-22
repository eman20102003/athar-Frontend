import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
import { useEffect, useState,useRef  } from "react";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { toast } from "react-toastify";
import { getBookFile, updateProgress } from "../../api/libraryApi";
import { useDebounce } from "../../hooks/useDebounce";
import ReaderToolbar from "../../components/reader/ReaderToolbar";
import BookmarksPanel from "../../components/reader/BookmarksPanel";
import NotesPanel from "../../components/reader/NotesPanel";
import HighlightsPanel from "../../components/reader/HighlightsPanel";
import ChatPanel from "../../components/ai/ChatPanel";
import Loader from "../../components/common/Loader";
import { AnimatePresence, motion } from "framer-motion";
import "./Reader.css";

const Reader = () => {
  const { bookId } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [sidePanel, setSidePanel] = useState("bookmarks");
   const highlightsRef = useRef(null);
  useEffect(() => {
    getBookFile(bookId, "read")
      .then((res) => setPdfUrl(URL.createObjectURL(res.data)))
      .catch((err) => {
        if (err.response?.status === 403) toast.error("يجب شراء الكتاب أولاً للوصول للقراءة");
      });
  }, [bookId]);

  const debouncedUpdateProgress = useDebounce((page) => updateProgress(bookId, page), 3000);

 useEffect(() => {
  debouncedUpdateProgress(pageNumber);
}, [pageNumber]);

  if (!pdfUrl) return <Loader />;

  return (
    <div className="reader">
      <ReaderToolbar
        pageNumber={pageNumber}
        numPages={numPages}
        onPrev={() => setPageNumber((p) => Math.max(1, p - 1))}
        onNext={() => setPageNumber((p) => Math.min(numPages, p + 1))}
        bookId={bookId}
        currentPage={pageNumber}
        onTabChange={setSidePanel}
        activeTab={sidePanel}
        onHighlightAdded={() => highlightsRef.current?.reload()} 
  />

      <div className="reader__body">
        <div className="reader__viewer">
          <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            <Page pageNumber={pageNumber} width={620} />
          </Document>
        </div>

       <aside className="reader__side">
  <AnimatePresence mode="wait">
    <motion.div
      key={sidePanel}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      style={{ height: "100%" }}
    >
      {sidePanel === "bookmarks" && <BookmarksPanel bookId={bookId} onJump={setPageNumber} />}
      {sidePanel === "notes" && <NotesPanel bookId={bookId} currentPage={pageNumber} />}
      {sidePanel === "highlights" && <HighlightsPanel bookId={bookId} onJump={setPageNumber} />}
      {sidePanel === "ai" && <ChatPanel bookId={bookId} currentPage={pageNumber} />}
    </motion.div>
  </AnimatePresence>
</aside>
      </div>
    </div>
  );
};

export default Reader;