// Dashboard.js
import FooterDashboard from "../components/FooterDashboard";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";
import DashboardCategory from "./dashboard/DashboardCategory";
import DashboardIndex from "./dashboard/DashboardIndex";
import DashboardProduct from "./dashboard/DashboardProduct";
import DashboardProfile from "./dashboard/DashboardProfile";
import { Route, Routes } from "react-router-dom";
import DashboardService from "./dashboard/DashboardService";
import DashboardOffer from "./dashboard/DashboardOffer";
import DashboardUser from "./dashboard/DashboardUser";
import useThemeCustomizer from '../hooks/useThemeCustomizer';
import useConfig from '../hooks/useConfig';
import Alert from "../components/Alert";
import useItemsFetch from "../hooks/useItemsFetch";
import useSetUserType from "../hooks/useSetUserType";
import DashboardCart from "./dashboard/DashboardCart";
import DashboardCheckout from "./dashboard/DashboardCheckout";
import DashboardBillingHistory from "./dashboard/DashboardBillingHistory";
import DashboardInvoice from "./dashboard/DashboardInvoice";
import useGetProfile from "../hooks/useGetProfile";
import { useContext } from "react";
import { UniversalContext } from '../context/UniversalContext';


const Dashboard = () => {
  const { getValue } = useContext(UniversalContext);
  const userType = getValue("userType");
  useSetUserType();
  useItemsFetch();
  useConfig();
  useThemeCustomizer();
  useGetProfile();
  return (
    <>
    <Alert/>
    <div className="wrapper">
      
      <Topbar />
      <Sidebar />
      <div className="content-page">
      
        <div className="content">
          <Routes>
          <Route exact path="/" element={userType === 'customer'||userType === 'staff' ? <DashboardProfile /> : <DashboardIndex />} />
          <Route path="/profile" element={<DashboardProfile />} />
          <Route path="/products" element={<DashboardProduct/>} />
          <Route path="/categories" element={<DashboardCategory/>} />
          <Route path="/services" element={<DashboardService/>} />
          <Route path="/offers" element={<DashboardOffer/>} />
          <Route path="/users" element={<DashboardUser/>} />
          <Route path="/cart" element={<DashboardCart/>} />
          <Route path="/checkout" element={<DashboardCheckout/>} />
          <Route path="/bill" element={<DashboardBillingHistory/>} />
          <Route path="/invoice" element={<DashboardInvoice/>} />
          </Routes>
        </div>
        <FooterDashboard />
      </div>
    </div>
    </>
  );
};

export default Dashboard;