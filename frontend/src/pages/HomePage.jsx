import { useContext,useEffect } from "react";
import Carousel from "../components/Carousel";
import { Route, Routes,useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "./NavBar";
import styled from "styled-components";
import DashboardProduct from "./dashboard/DashboardProduct";
import DashboardService from "./dashboard/DashboardService";
import DashboardOffer from "./dashboard/DashboardOffer";
import useItemsFetch from "../hooks/useItemsFetch";
import { UniversalContext } from '../context/UniversalContext';
import { barrier } from "../middleware/securityMiddleware";
import AboutUs from "./AboutUs";

const StyledNavbar = styled(Navbar)`
  position: relative;
  z-index: 1000; /* add high z-index */
`;

const Homepage = () => {
    useItemsFetch();
    const { setValue } = useContext(UniversalContext);
    const navigate = useNavigate();

    useEffect(() => {
        barrier(setValue,navigate);     
    }, [])

  return (
    <>
    <StyledNavbar/>
     <div className="content">
          <Routes>
          <Route exact path="/" element={<Carousel/>} />
          <Route path="products" element={
            
           <div className="mt-5 mb-5">
            <DashboardProduct/>
           </div>
            
            } />
          <Route path="services" element={
            <div className="mt-5 mb-5">
          <DashboardService/>
          </div>} />
          <Route path="offers" element={
            <div className="mt-5 mb-5">
          <DashboardOffer/>
          </div>} />
          <Route path="about-us" element={
            <div className="mt-5 mb-5">
          <AboutUs/>
          </div>} />
          </Routes>
        </div>
        <Footer/>
    </>
  );
};

export default Homepage;