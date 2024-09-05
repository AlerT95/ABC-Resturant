import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";
import logoSm from "../assets/images/logo-sm.png";
import { useContext } from 'react';
import { UniversalContext } from '../context/UniversalContext';

function Sidebar() {
  const { getValue } = useContext(UniversalContext);
  const userType = getValue("userType");

  return (
    <div className="leftside-menu" style={{ backgroundColor: '#272e03',color:'#fff' }}>
      <Link to="/" className="logo logo-light">
        <span className="logo-lg">
          <img src={logo} alt="logo" height="30" />
        </span>
        <span className="logo-sm">
          <img src={logoSm} alt="small logo"  />
        </span>
      </Link>

      <Link to="/" className="logo logo-dark">
        <span className="logo-lg">
          <img src={logoDark} alt="dark logo" height="30" />
        </span>
        <span className="logo-sm">
          <img src={logoSm} alt="small logo" />
        </span>
      </Link>

      <div className="h-100" id="leftside-menu-container" data-simplebar>
        <ul className="side-nav">
          <li className="side-nav-title">Main</li>

          {userType === 'customer' ? (
            <>
              <li className="side-nav-item">
                <Link to="products" className="side-nav-link">
                  <i className="ri-store-2-line"></i>
                  <span> Products </span>
                </Link>
              </li>

              <li className="side-nav-item">
                <Link to="services" className="side-nav-link">
                  <i className="ri-service-line"></i>
                  <span> Services </span>
                </Link>
              </li>

              <li className="side-nav-item">
                <Link to="offers" className="side-nav-link">
                  <i className="ri-gift-2-line"></i>
                  <span> Offers </span>
                </Link>
              </li>

              <li className="side-nav-item">
                <Link to="bill" className="side-nav-link">
                  <i className="ri-money-dollar-circle-line"></i>
                  <span> Billing History </span>
                </Link>
              </li>
            </>
          ) : userType === 'staff' ? (
            <>
              <li className="side-nav-item">
                <Link to="products" className="side-nav-link">
                  <i className="ri-store-2-line"></i>
                  <span> Products </span>
                </Link>
              </li>
          
              <li className="side-nav-item">
                <Link to="services" className="side-nav-link">
                  <i className="ri-service-line"></i>
                  <span> Services </span>
                </Link>
              </li>
          
              <li className="side-nav-item">
                <Link to="offers" className="side-nav-link">
                  <i className="ri-gift-2-line"></i>
                  <span> Offers </span>
                </Link>
              </li>
          
              <li className="side-nav-item">
                <Link to="bill" className="side-nav-link">
                  <i className="ri-money-dollar-circle-line"></i>
                  <span> Billing History </span>
                </Link>
              </li>
            </>
          ): (
            <>
              <li className="side-nav-item">
                <Link to="/dashboard" className="side-nav-link">
                  <i className="ri-dashboard-3-line"></i>
                  <span> Dashboard </span>
                </Link>
              </li>

              <li className="side-nav-item">
                <Link to="products" className="side-nav-link">
                  <i className="ri-store-2-line"></i>
                  <span> Products </span>
                </Link>
              </li>

              <li className="side-nav-item">
                <Link to="categories" className="side-nav-link">
                  <i className="ri-list-check-2"></i>
                  <span> Categories </span>
                </Link>
              </li>

              <li className="side-nav-item">
                <Link to="services" className="side-nav-link">
                  <i className="ri-service-line"></i>
                  <span> Services </span>
                </Link>
              </li>

              <li className="side-nav-item">
                <Link to="offers" className="side-nav-link">
                  <i className="ri-gift-2-line"></i>
                  <span> Offers </span>
                </Link>
              </li>

              <li className="side-nav-item">
                <Link to="users" className="side-nav-link">
                  <i className="ri-user-3-line"></i>
                  <span> Users </span>
                </Link>
              </li>

              <li className="side-nav-item">
                <Link to="bill" className="side-nav-link">
                  <i className="ri-money-dollar-circle-line"></i>
                  <span> Billing History </span>
                </Link>
              </li>

              {/* ... other list items ... */}
            </>
          )}
        </ul>

        <div className="clearfix"></div>
      </div>
    </div>
  );
}

export default Sidebar;