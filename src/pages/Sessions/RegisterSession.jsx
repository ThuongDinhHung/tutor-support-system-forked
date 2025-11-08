import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import RegisterPage from "../../components/session_list/RegisterPage";
import { Link, useNavigate } from "react-router-dom";
const RegisterSession = () => {
  return (
    <div className="">
      <Header />
      <RegisterPage />
      <Footer />
    </div>
  );
};
export default RegisterSession;
