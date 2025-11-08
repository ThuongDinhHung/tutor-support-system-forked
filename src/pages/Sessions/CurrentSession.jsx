import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MySessions from "../../components/session_list/MySessions";
import { Link, useNavigate } from "react-router-dom";
const CurrentSession = () => {
  return (
    <div className="">
      <Header />
      <MySessions />
      <Footer />
    </div>
  );
};
export default CurrentSession;
