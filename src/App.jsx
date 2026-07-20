import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
      <ScrollToTop />
      <ToastContainer position="bottom-left" rtl />
    </>
  );
}

export default App;